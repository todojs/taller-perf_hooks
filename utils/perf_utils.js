const {performance, PerformanceObserver} = require ('perf_hooks');

function entriesStatistics (entries, fields = 'all') {
  if (entries.length === 0) {
    return {}
  }
  const values = {};
  for (let entry of entries) {
    if (!values[ entry.name ]) {
      values[ entry.name ] = {
        count : 0,
        sum   : 0,
      }
    }
    values[ entry.name ].count++;
    values[ entry.name ].sum += entry.duration;
  }
  for (let name of Object.keys (values)) {
    values[ name ].avg       = values[ name ].sum / values[ name ].count;
    values[ name ].perSecond = 1000 / values[ name ].avg;
    values[ name ].sdiff     = 0;
  }
  for (let entry of entries) {
    values[ entry.name ].sdiff += Math.pow (entry.duration - values[ entry.name ].avg, 2);
  }
  for (let name of Object.keys (values)) {
    values[ name ].stddev = Math.sqrt (values[ name ].sdiff / values[ name ].count);
    delete values[ name ].sdiff;
  }
  for (let name of Object.keys (values)) {
    const sortDuration         = entries.filter (x => x.name === name).map (x => x.duration).sort ( (a, b) => a - b);
    values[ name ].min         = sortDuration[ 0 ];
    values[ name ].max         = sortDuration[ sortDuration.length - 1 ];
    values[ name ].percentiles = [];
    const onePercent           = Math.floor (values[ name ].count / 100);
    for (let p = 1; p < 100; p++) {
      values[ name ].percentiles[ p - 1 ] = sortDuration[ onePercent * p ];
    }
    values[ name ].percentiles[ 99 ]  = sortDuration[ sortDuration.length - 1 ];
    values[ name ].interquartileRange = [ values[ name ].percentiles[ 24 ], values[ name ].percentiles[ 74 ] ];
    values[ name ].ninetyeightRange   = [ values[ name ].percentiles[ 1 ], values[ name ].percentiles[ 98 ] ];
    
  }
  const result = [];
  for (let name of Object.keys (values).sort ()) {
    if (fields === 'all') {
      result.push (Object.assign (values[ name ], {name}));
    } else {
      const tmp = {name};
      for (let n in fields) {
        const prop  = fields[ n ];
        tmp[ prop ] = values[ name ][ prop ];
      }
      result.push (tmp);
    }
  }
  return result;
}

function entries2CSV (entries) {
  let init   = true;
  let result = [];
  for (let entry of entries) {
    if (init) {
      init = false;
      result.push (Object.keys (entry).map (x => `"${ x }";`).join (''));
    }
    let line = '';
    for (let property in entry) {
      let quote = Number.isNaN (parseFloat (entry[ property ])) ? '"' : '';
      line += `${ quote }${ typeof entry[ property ] === 'number' ? entry[ property ].toString ().replace ('.', ',') : entry[ property ] }${ quote };`;
    }
    result.push (line);
  }
  return result.join ('\n');
}

// function observer (options) {
//   options   = Object.assign ({entryTypes : [ 'measure' ], output : 'object', raw : false, statisticsFields : 'all'}, options);
//   const obs = new PerformanceObserver ((list) => {
//     console.log (
//       options.raw ?
//         options.output === 'csv' ?
//           entries2CSV (list.getEntries ()) :
//           JSON.stringify (list.getEntries (), null, 2) :
//         options.output === 'csv' ?
//           entries2CSV (entriesStatistics (list.getEntries (), options.statisticsFields)) :
//           JSON.stringify (entriesStatistics (list.getEntries (), options.statisticsFields), null, 2));
//     obs.disconnect ();
//   });
//   obs.observe ({entryTypes : Array.isArray (options.entryTypes) ? options.entryTypes : [ options.entryTypes ], buffered : true});
// }
//
// const PRETIMERIFY = Symbol ();
//
// function timerifyClass (Class) {
//   const descriptors = Object.getOwnPropertyDescriptors (Class.prototype);
//   const originals   = {};
//   for (let name of Reflect.ownKeys (descriptors)) {
//     let prop          = descriptors [ name ];
//     originals[ name ] = Object.assign ({}, prop);
//     if (typeof prop.value === 'function' && name !== 'constructor') {
//       prop.value.name = Object.defineProperty (prop.value, 'name', {value : Class.name + '.prototype.' + (prop.value.name || '[Symbol]')});
//       prop.value      = performance.timerify (prop.value)
//     }
//     if (typeof prop.set === 'function') {
//       prop.set.name = Object.defineProperty (prop.set, 'name', {value : Class.name + '.prototype.' + (prop.set.name || '[Symbol]')});
//       prop.set      = performance.timerify (prop.set)
//     }
//     if (typeof prop.get === 'function') {
//       prop.get.name = Object.defineProperty (prop.get, 'name', {value : Class.name + '.prototype.' + (prop.get.name || '[Symbol]')});
//       prop.get      = performance.timerify (prop.get)
//     }
//     Object.defineProperty (Class.prototype, name, prop);
//   }
//   Class.prototype[ PRETIMERIFY ] = originals;
// }
//
// function untimerifyClass (Class) {
//   Object.defineProperties (Class.prototype, Class.prototype[ PRETIMERIFY ]);
//   delete Class.prototype[ PRETIMERIFY ];
// }
//


module.exports = {
  entriesStatistics,
  entries2CSV
};