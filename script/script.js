const Buttons = document.querySelectorAll(".Num_button");
const Num_Display = document.querySelector(".num_display");
const Operator = document.querySelectorAll(".Operator");

const Negative_Operator = document.querySelector("#Negative");
const Percent_Operator = document.querySelector("#Percent");
const Dot_Operator = document.querySelector(".Dot_button");
const Del = document.querySelector(".Del");
const Equal = document.querySelector(".Equal");

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

Buttons.forEach(Button => {
    Button.addEventListener("click", () => {
        const value = Button.textContent;
        if (Num_Display.textContent.length === MaxNumberOn_Calculator) return;
        displayValue += value;
        Num_Display.textContent = displayValue;
    });
});

Operator.forEach(Button => {
    Button.addEventListener("click", () => {
        if (displayValue === "" && AlreadyCalculate !== null) {
            First_number = AlreadyCalculate;
        } else {
            First_number = parseFloat(displayValue);
        }
        
        if (isNaN(First_number)) return; 

        let Val = Button.textContent;
        displayValue = "";
        switch (Val) {
            case "÷":
                Use_Operator = "/";
                break;
            case "x":
                Use_Operator = "*";
                break;
            case "-":
                Use_Operator = "-";
                break;
            case "+":
                Use_Operator = "+";
                break;
            default:
                break;
        }
    });
});

Equal.addEventListener("click", () => {
    if (displayValue === "" && AlreadyCalculate !== null) {
        Second_number = AlreadyCalculate;  
    } else {
        Second_number = parseFloat(displayValue);
    }

    if (isNaN(Second_number)) return;  

    displayValue = "";
    let result;
    
    switch (Use_Operator) {
        case "/":
            result = Divide(First_number, Second_number);
            break;
        case "*":
            result = Multiply(First_number, Second_number);
            break;
        case "-":
            result = Minus(First_number, Second_number);
            break;
        case "+":
            result = Sum(First_number, Second_number);
            break;
        default:
            return;
    }

    Num_Display.textContent = Math.round(result); 
    AlreadyCalculate = result;  
    First_number = AlreadyCalculate; 
    Second_number = null;
    Use_Operator = ""; 
});


Del.addEventListener('click', () => {
    displayValue = displayValue.slice(0,-1)
    Num_Display.textContent = displayValue
})

Cle