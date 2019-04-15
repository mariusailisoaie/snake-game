const numbers = [];

for(let i = 0; i < 10; i++) {
  numbers.push(i + 1);
}

const spliced = numbers.splice(0, 3);

console.log(numbers);
console.log(spliced);

/* const randomNumbersArr = [];

for(let i = 0; i < 100; i++) {
  let randomNumber = Math.floor(Math.random() * 19 + 1);
  randomNumbersArr.push(randomNumber * 20);
}

console.log(randomNumbersArr.sort((a, b) => a - b));
*/