const display = document.getElementById("display");
const display1 = document.getElementById("display1");

function appendToDisplay(input) {
  const operators = ["+", "-", "*", "/", "%"];
  const lastChar = display.value.slice(-1);

  if (operators.includes(lastChar) && operators.includes(input)) {
    return;
  }

  display.value += input;
}

function clearDisplay() {
  display.value = "";
  display1.value = "";
}

function deleteLast() {
  display.value = display.value.slice(0, -1);
}

function myEval(expression) {
  function precedence(op) {
    switch (op) {
      case "+":
      case "-":
        return 1;
      case "*":
      case "/":
      case "%":
        return 2;
      default:
        return 0;
    }
  }

  function applyOp(a, b, op) {
    switch (op) {
      case "+":
        return a + b;
      case "-":
        return a - b;
      case "*":
        return a * b;
      case "/":
        return b === 0 ? "undefined" : a / b;
      case "%":
        return a % b;
      default:
        return 0;
    }
  }

  const numbers = [];
  const operators = [];
  let i = 0;

  while (i < expression.length) {
    const ch = expression[i];

    if (!isNaN(ch) || ch === ".") {
      let numStr = "";
      while (
        i < expression.length &&
        (!isNaN(expression[i]) || expression[i] === ".")
      ) {
        numStr += expression[i];
        i++;
      }
      numbers.push(parseFloat(numStr));
      continue;
    } else if ("+-*/%".includes(ch)) {
      while (
        operators.length &&
        precedence(ops[operators.length - 1]) >= precedence(ch)
      ) {
        const b = numbers.pop();
        const a = numbers.pop();
        const op = ops.pop();
        numbers.push(applyOp(a, b, op));
      }
      operators.push(ch);
    }

    i++;
  }

  while (operators.length) {
    const b = numbers.pop();
    const a = numbers.pop();
    const op = operators.pop();
    values.push(applyOp(a, b, op));
  }

  return numbers.pop();
}

function calculate() {
  try {
    //     let displayValue = display.value;
    //    console.log("display", displayValue);
    //   const calculated = (displayValue) => {
    //     let convertedToNumber = Number(displayValue);
    //     console.log("converted", convertedToNumber);
    display1.value = display.value;
    display.value = myEval(display.value);
  } catch (error) {
    display.value = "Error";
  }
}
