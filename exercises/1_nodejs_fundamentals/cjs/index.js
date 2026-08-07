const math = require("./utils/math");
const capitalize = require("./utils/strings");
console.log(math.add(2, 3));
console.log(math.subtract(6, 4));
console.log(math.multiply(2, 2));
console.log(capitalize("hello"))
console.log(require.cache);
//require.cache is a built-in object in Node.js, that stores every
//module after it's loaded with require() function. The files appear here
//beacuse Node.js caches them so they don't need to be loaded and executed again
