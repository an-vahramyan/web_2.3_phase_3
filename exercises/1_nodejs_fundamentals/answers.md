1. Node starts file with **exports === module.exports === {}**, both points to the same empty object.
If I write:
   **exports = {add, subtract}**
I create a new object and make the local `exports` point to it, but module.exports not touched so it still points to the original empty object. When we run the file Node takes whatever module.exports points to and returns it. So if we want to export an object with add and subtract, we need to assign it to module.exports instead of exports._(so require('.math') returns {} and trying to access add or subtract will return undefined)_.

2. **exports.xxx** is convenient for exporting multiple functions or properties, **module.exports** is more convenient for exporting a single function or object, or replacing the entire exported value. Both are valid for exporting.

3. when we use **require('./utils/math')** Node will look for a file named **math.js** in folder utils, and if it doesn't found Node will look for math.json or math.node. If it still doesn't find any of those files, Node will look for a folder named **math** in the utils folder, and if it finds it, Node will look for an **index.js** file inside that folder. If it doesn't find any of those files, Node will throw an error. But for import we need to specify the file extension, because ES6 is more static and doesn't have resolution algorithm like CommonJS.

4. **CommonJS** uses synchronous module lending, it means that modules are loaded and executed when we call `require()`. *CommonJS* allows dynamic module paths, and at the top level `this` refers to the current module object. (by default files has extansion `.js`).

**ES6 Modules** use a static import/export system, so JS engine can analize the code in compile time before execution. It's give us optimizations like tree shaking when module that is not used in the code removed from the final bundle. ES Module path must be static strings. `This` in ES modules is always undefined.(by default files has extansion .mjs or .js with "type": "module" in package.json).
