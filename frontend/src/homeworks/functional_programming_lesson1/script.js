function curry(fn) {

  return function curried(...args) {
    const allArgs = [...args];
    if (allArgs.length >= fn.length) {
      return fn(...allArgs);
    }
    return function (...nextArgs) {
      const combained = [...args, ...nextArgs];
      return curried(...combained);
    };
  };
}

const sum = (a, b, c) => a + b + c;

const fn = curry(sum);

console.log(fn(1, 2, 3)); // 6
console.log(fn(1)(2, 3)); // 6
console.log(fn(1, 2)(3)); // 6
console.log(fn(1)(2)(3)); //6
