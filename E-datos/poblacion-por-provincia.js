const data = require ('./municipios.json');

function poblacionPorMunicipioA (data) {
  const result = {}, tmp = {};
  const copy   = data.slice ();
  copy.reduce ((provincia, record) => {
    tmp[ record.provincia ] = (tmp[ record.provincia ] || 0) + record.poblacion;
    return record.provincia;
  }, copy[ 0 ].provincia);
  Object.keys (tmp)
        .sort ((a, b) => a.localeCompare (b))
        .forEach ((k) => result[ k ] = tmp[ k ]);
  return result;
}

function poblacionPorMunicipioB (data) {
  const tmp = data.slice ()
                  .reduce ((obj, record) => {
                    obj[ record.provincia ] = (obj[ record.provincia ] || 0) + record.poblacion;
                    return obj;
                  }, {});
  return Object.getOwnPropertyNames (tmp)
               .sort ((a, b) => a.localeCompare (b))
               .reduce ((result, k) => {
                 result[ k ] = tmp[ k ];
                 return result;
               }, {});
  
}

function poblacionPorMunicipioC (data) {
  const tmp = {};
  for (let record of data) {
    tmp[ record.provincia ] = (tmp[ record.provincia ] || 0) + record.poblacion;
  }
  const result = {};
  for (let key of Object.getOwnPropertyNames (tmp).sort ((a, b) => a.localeCompare (b))) {
    result[ key ] = tmp[ key ]
  }
  return result;
}


console.log (poblacionPorMunicipioA (data));
console.log (poblacionPorMunicipioB (data));
console.log (poblacionPorMunicipioC (data));