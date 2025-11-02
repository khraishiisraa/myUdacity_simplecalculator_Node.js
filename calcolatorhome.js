// Import the built-in 'readline' module for terminal input
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Utility function to get input as a Promise
function ask(question) {
  return new Promise(function(resolve) {
    rl.question(question, resolve);
  });
}


async function calculator() {
  console.log("<< A simple Calculator with Math module >>");

  // Read first number and validate
  let result;
  while (true) {
    const first = await ask("Enter first number: ");
    const num = parseFloat(first);
    if (!isNaN(num)) {
      result = num;
      break;
    } else {
      console.log("Invalid number. Try again.");
    }
  }

  // Operator loop
  while (true) {
    const operator = (await ask("Enter operator (+, -, *, /, ^, sqrt, =): ")).trim();

    if (operator === "=") break;

    if (!["+", "-", "*", "/","sqrt"].includes(operator)) {
      console.log("Invalid operator. Try again.");
      continue;
    }

    if (operator === "sqrt") {
      if (result < 0) {
        console.log("Math ERROR: Cannot take sqrt of a negative number.");
        continue;
      }
      result = Math.sqrt(result);
      console.log(`Current result: ${result}`);
      continue;
    }

    // For other operations, ask for a second number
    const nextInput = await ask("Enter next number: ");
    const number = parseFloat(nextInput);

    if (isNaN(number)) {
      console.log("Invalid number. Try again.");
      continue;
    }

    switch (operator) {
      case "+":
        result += number;
        break;
      case "-":
        result -= number;
        break;
      case "*":
        result *= number;
        break;
      case "/":
        if (number === 0) {
          console.log("Math ERROR: Cannot divide by zero.");
          continue;
        } else {
          result /= number;
        }
      
    }

    console.log(`Current result: ${result}`);
  }

  console.log(`The final result: ${result}`);
  rl.close();
}

// Run the calculator
calculator();
