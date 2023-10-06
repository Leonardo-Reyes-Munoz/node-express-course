const randomNum = Math.floor(Math.random() * 300);

if (randomNum % 2 === 0) {
  console.log(`Your random number is an even number, ${randomNum}`);
} else {
  console.log(`Your random number is an odd number, ${randomNum}`);
}
