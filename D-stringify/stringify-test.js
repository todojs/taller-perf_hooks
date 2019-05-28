const fastJson          = require ('fast-json-stringify');
const stringifyFast     = fastJson (require ('./schema.json'));
const stringifyOriginal = JSON.stringify;
const data              = require ('./data.json');

console.log (stringifyFast (data));
console.log (stringifyOriginal (data));