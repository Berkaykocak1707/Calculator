const display = document.querySelector(".calculator-screen");
const keys = document.querySelector(".calculator-keys");

let displayValue = 0;
let number1 = null;
let operator = null;
let waitForNumber2 = false;
updateDisplay();

function updateDisplay() {
  display.value = displayValue;
}

keys.addEventListener("click", function (e) {
  const element = e.target;
  if (!element.matches("button")) return;

  if (element.classList.contains("operator")) {
    // console.log("operator", element.value);
    operatorHandle(element.value);
    updateDisplay();
    return;
  }

  if (element.classList.contains("decimal")) {
    // console.log('decimal', element.value);
    inputDecimal();
    updateDisplay();
    return;
  }

  if (element.classList.contains("all-clear")) {
    clear();
    updateDisplay();
    return;
  }

  inputNumber(element.value);
  updateDisplay();
});

function operatorHandle(NewOperator){
    const value = parseFloat(displayValue);

    if (operator && waitForNumber2) {
        operator = NewOperator;
        return;
    }

    if (number1 === null)
    {
        number1 = value;
    }
    else if (operator)
    {
        const result = calculate(number1,value,operator);
        displayValue = `${parseFloat(result.toFixed(7))}`; 
        number1 = result;
    }
    waitForNumber2 = true;
    operator = NewOperator;
}

function calculate(num1, num2, operator)
{
    if(operator === '+')
    {
        return num1+num2;
    }
    else if(operator === '-')
    {
        return num1-num2;
    }
    else if(operator === '/')
    {
        return num1/num2;
    }
    else if(operator === '*')
    {
        return num1*num2;
    }

    return num2;
}

function inputNumber(num) {
    if(waitForNumber2)
    {
        displayValue = num;
        waitForNumber2 = false;
    }
    else
    {
        displayValue = displayValue === 0 ? num : displayValue + num;
    }
}

function inputDecimal() {
  if (!displayValue.includes(".")) {
    displayValue += ".";
  }
}

function clear(){
    displayValue = 0;
}
