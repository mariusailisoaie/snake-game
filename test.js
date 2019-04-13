const randomNumbersArr = [];

for(let i = 0; i < 100; i++) {
  let randomNumber = Math.floor(Math.random() * 19 + 1);
  // console.log(randomNumber);
  randomNumbersArr.push(randomNumber * 20);
}

console.log(randomNumbersArr.sort((a, b) => a - b));
