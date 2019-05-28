function getAllPropertyNames1 (obj) {
  const proto = Object.getPrototypeOf (obj);
  return (
    (proto !== null ? getAllPropertyNames1 (proto) : [])
      .concat (Object.getOwnPropertyNames (obj))
      .filter (function (item, pos, result) {
        return result.indexOf (item) === pos;
      })
      .sort ()
  );
}

function getAllPropertyNames2 (obj) {
  const proto = Object.getPrototypeOf (obj);
  return (
    (proto !== null ? getAllPropertyNames2 (proto) : [])
      .concat (Object.getOwnPropertyNames (obj))
      .filter (function (item, pos, result) {
        return result.indexOf (item) === pos;
      })
  );
}

function getAllPropertyNames3 (obj) {
  const result = new Set ();
  let next     = obj;
  do {
    Object.getOwnPropertyNames (next).forEach (e => result.add (e));
  } while (null !== (next = Object.getPrototypeOf (next)));
  return [ ...result ];
}

function getAllPropertyNames4 (obj) {
  const result = new Set ();
  let next     = obj;
  do {
    Object.getOwnPropertyNames (next).forEach (e => result.add (e));
  } while (null !== (next = Object.getPrototypeOf (next)));
  return [ ...result ].sort ();
}

class A extends Array {
  m1 () { /*...*/
  }
  
  m2 () { /*...*/
  }
}

class AA extends A {
  m3 () { /*...*/
  }
  
  m4 () { /*...*/
  }
}

const aa = new AA ();


console.assert (getAllPropertyNames1 (aa).length === 46);
console.assert (getAllPropertyNames2 (aa).length === 46);
console.assert (getAllPropertyNames3 (aa).length === 46);
console.assert (getAllPropertyNames4 (aa).length === 46);

