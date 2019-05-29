function getAllPropertyNames (obj) {
  const proto = Object.getPrototypeOf (obj);
  return (
    (proto !== null ? getAllPropertyNames (proto) : [])
      .concat (Object.getOwnPropertyNames (obj))
      .filter (function (item, pos, result) {
        return result.indexOf (item) === pos;
      })
      .sort ()
  );
}

class A extends Array {
  m1 () { /*...*/}
  m2 () { /*...*/}
}

class AA extends A {
  m3 () { /*...*/}
  m4 () { /*...*/}
}

const aa = new AA ();

console.log (getAllPropertyNames (aa));