const Buttons = document.querySelectorAll(".Num_button");
const Num_Display = document.querySelector(".num_display");
const Operator = document.querySelectorAll(".Operator");

const Percent_Operator = document.querySelector(".Percent");
const Dot_Operator = document.querySelector(".Dot_button");
const Del = document.querySelector(".Del");
const Equal = document.querySelector(".Equal");
const Clear = document.querySelector(".Clear");
const Calculation = document.querySelector(".Calculation");

const MaxNumberOn_Calculator = 8;

let displayValue = "";
let First_number = null;
let Second_number = null;
let AlreadyCalculate = null;
let Use_Operator = "";
let IsDot_used = false;

function Sum(num1, num2) {
    return num1 + num2;
}

function Minus(num1, num2) {
    return num1 - num2;
}

function Multiply(num1, num2) {
    return num1 * num2;
}

function Divide(num1, num2) {
    return num2 === 0 ? "Error" : num1 / num2;
}

function Remainder(num1,num2) {
    return num2 === 0 ? "Error" : num1 % num2;
}

Buttons.forEach(Button => {
    Button.addEventListener("click", () => {
        if (Num_Display.textContent.length >= MaxNumberOn_Calculator) return;
        displayValue += Button.textContent;
        Num_Display.textContent = displayValue;
    });
});

Operator.forEach(Button => {
    Button.addEventListener("click", () => {
        if (Use_Operator !== "") return;
        if (displayValue === "" && AlreadyCalculate !== null) {
            First_number = AlreadyCalculate;
        } else {
            First_number = parseFloat(displayValue);
        }

        if (isNaN(First_number)) return;

        Use_Operator = Button.textContent;
        displayValue = "";
        Calculation.textContent = First_number + " " + Use_Operator;
        Num_Display.textContent = Use_Operator;
    });
});

Equal.addEventListener("click", () => {
    if (displayValue === "" && AlreadyCalculate !== null) {
        Second_number = AlreadyCalculate;
    } else {
        Second_number = parseFloat(displayValue);
    }

    if (isNaN(Second_number) || Use_Operator === "") return;

    let result;
    switch (Use_Operator) {
        case "÷":
            result = Divide(First_number, Second_number);
            break;
        case "x":
            result = Multiply(First_number, Second_number);
            break;
        case "-":
            result = Minus(First_number, Second_number);
            break;
        case "+":
            result = Sum(First_number, Second_number);
            break;
        case "%":
            result = Remainder(First_number,Second_number);
            break;
        default:
            return;
    }

    Calculation.textContent = First_number + " " + Use_Operator + " " + Second_number + " =";
    Num_Display.textContent = isNaN(result) ? "Error" : parseFloat(result.toFixed(2));
    AlreadyCalculate = result;
    displayValue = String(result);
    First_number = AlreadyCalculate;
    Second_number = null;
    Use_Operator = "";
});

Del.addEventListener("click", () => {
    Calculation.textContent = ""
    if (displayValue.length > 0) {
        displayValue = displayValue.slice(0, -1);
        Num_Display.textContent = displayValue;
    }
});

Clear.addEventListener("click", () => {
    displayValue = "";
    First_number = null;
    Second_number = null;
    AlreadyCalculate = null;
    Use_Operator = "";
    IsDot_used = false;
    Num_Display.textContent = "";
    Calculation.textContent = "";
});

Dot_Operator.addEventListener("click", () => {
    if (IsDot_used === true) return;
    IsDot_used = true;
    displayValue = displayValue + ".";
    Num_Display.textContent = displayValue;
});
