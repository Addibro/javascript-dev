import numeral from 'numeral'; // package for formatting numbers

const courseValue = numeral(1000).format('$0,0.00');
console.log(`I would pay ${courseValue} for this awesome course!`);
// here we use ES6 template string feature, with `` back tics, which tells javascript to parse any variable placeholders inside the curly brackets

