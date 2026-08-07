import { add, subtract, multiply } from "./utils/math.js";
import capitalize  from "./utils/strings.js";
console.log(add(2, 3));
console.log(subtract(5, 1));
console.log(multiply(2, 2));
console.log(capitalize("hello"));
console.log(import.meta.url);
//__filename is not available in ES Modules
//import meta url provides the current module's file url
