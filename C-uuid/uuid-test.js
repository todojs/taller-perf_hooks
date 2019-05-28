const LOOPS = 100000;
[
  ['uuid/v4',   require ('uuid/v4')],         // https://github.com/broofa/node-uuid
  ['nanoid',    require ('nanoid')],          // https://github.com/ai/nanoid
  ['hyperid',   require ('hyperid')()],       // https://github.com/mcollina/hyperid
  ['fast-uuid', require ('./fast-uuid').v4],  // https://bl.ocks.org/solderjs/7e5ebb9a6708d0ebfc78
  ['custom',    require ('./micro-uuid')]
].forEach(p => {
  const name = p[0];
  const uuid = p[1];
  const loops = 100000;
  const check = new Set ();
  for (let n = 0; n < loops; n++) {
    check.add (uuid ());
  }
  console.assert (check.size === loops);
});