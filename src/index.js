let evaluateInputString = "";

const dropdownFunctions = document.querySelectorAll(".calculator-tf-trigonometry")

const dropdownTriangle = dropdownFunctions[0];
const dropdownFunction = dropdownFunctions[1];

const displayInput = document.querySelector("#display-input");

const dropdownModalTriangle = document.querySelector(".calculator-tf-modal-1")

const dropdownModalFunction = document.querySelector(".calculator-tf-modal-2")

dropdownTriangle.addEventListener("click", () => {
    dropdownModalTriangle.classList.contains('none') ? dropdownModalTriangle.classList.remove('none') : dropdownModalTriangle.classList.add('none')

    if (!dropdownModalFunction.classList.contains('none')) {
        dropdownModalFunction.classList.add('none')
    }
})


dropdownFunction.addEventListener("click", () => {
    dropdownModalFunction.classList.contains('none') ? dropdownModalFunction.classList.remove('none') : dropdownModalFunction.classList.add('none')

    if (!dropdownModalTriangle.classList.contains('none')) {
        dropdownModalTriangle.classList.add('none')
    }
})

function notInRange(value) {
    if (value >= '1' && value <= '9') {
        return false;
    }
    return true;
}

function handlePlusAndMinus(inputValue) {
    let currentDisplayInput = displayInput.value;
    if (currentDisplayInput.length == 0) {
        inputValue = '-'
        displayInput.value += inputValue
    }
    else if (currentDisplayInput.length && currentDisplayInput.charAt(currentDisplayInput.length - 1) >= '1' && currentDisplayInput.charAt(currentDisplayInput.length - 1) <= '9') {
        let countChar = 0;
        let i = currentDisplayInput.length - 1
        for (; i >= 0; i--) {
            if ((currentDisplayInput[i] >= '1' && currentDisplayInput[i] <= '9') || currentDisplayInput[i] === '.') {
                countChar++;
            }
            else {
                break;
            }
        }

        if (i == -1) {
            let oldValue = currentDisplayInput.slice(0);
            displayInput.value = `-${oldValue}`
        }
        else {
            if (currentDisplayInput[i] != '-') {
                let newValue = `-${currentDisplayInput.slice(i + 1)}`;
                let oldValue = currentDisplayInput.slice(0, i + 1);
                displayInput.value = `${oldValue}${newValue}`
            }
            else {
                let newValue = `${currentDisplayInput.slice(i + 1)}`;
                let oldValue = currentDisplayInput.slice(0, i);
                displayInput.value = `${oldValue}${newValue}`
            }
        }
    }
    evaluateInputString = displayInput.value;
}

function handleDisplayOutput(value) {
    if (value > 0 && !(value % 1)) {
        isDotOn = false;
        return value;
    }
    else if (value < 0 && !((value * -1) % 1)) {
        isDotOn = false;
        return value;
    }
    else if (value < 0) {
        valueArr = value.toString().split('');
        let isDot = false;
        let totalDigit = valueArr.reduce((acc, curr) => {
            if (isDot) acc++;
            if (curr === '.') {
                isDot = true;
            }
            return acc;
        }, 0)
        isDotOn = true;
        return totalDigit >= 3 ? Number(value).toFixed(3) : Number(value)
    }
    else {
        valueArr = value.toString().split('');
        let isDot = false;
        let totalDigit = valueArr.reduce((acc, curr) => {
            if (isDot) acc++;
            if (curr === '.') {
                isDot = true;
            }
            return acc;
        }, 0)
        isDotOn = true;
        return totalDigit >= 3 ? Number(value).toFixed(3) : Number(value)
    }
}

function handleDefaultCaseOfOperator(inputValue) {
    // if (inputValue.match(/[a-df-z]/gi)) {
    //     console.log("Invalid data");
    //     return;
    // }

    let currentDisplayLength = displayInput.value.length;
    let condition1 = (!currentDisplayLength && inputValue.match(/[+|*|\/|%]/g));
    let condition2 = currentDisplayLength === 1 && displayInput.value[0] === '-' && inputValue.match(/[.|+|*|\/|\-|%]/g)
    let condition3 = currentDisplayLength && displayInput.value[currentDisplayLength - 1] === '(' && inputValue.match(/[+|*|\/|%]/g)
    let condition4 = currentDisplayLength >= 1 && displayInput.value[currentDisplayLength - 2] === '-' && displayInput.value[currentDisplayLength - 1] === '-' && inputValue === "-";
    if (condition1 || condition2 || condition3 || condition4) {
        //do nothing
        // console.log("Do Nothing!!");
    }
    else if (lastIsOperator && inputValue === '-') {
        displayInput.value += "-"

    }
    else if (lastIsOperator && inputValue.match(/[+|*|\/|%]/g)) {
        let currentValue = displayInput.value.slice(0, currentDisplayLength - 1);
        displayInput.value = currentValue + inputValue

    }
    else if ((currentDisplayLength && displayInput.value[currentDisplayLength - 1] === '(' && inputValue === ".") || (!currentDisplayLength && inputValue === '.') || (lastIsOperator && inputValue === '.')) {
        if (!isDotOn) {
            displayInput.value += '0.'
        }
        isDotOn = true;
    }
    else {
        if (inputValue === ".") {
            if (!isDotOn) {
                displayInput.value += '.'
            }
            isDotOn = true;
        }
        else {
            displayInput.value += inputValue;
            document.querySelector("#display-input").focus()
            if (inputValue.match(/[+|*|\-|\/|%]/g)) {
                lastIsOperator = true;
                isDotOn = false;
            }
            else {
                lastIsOperator = false;
            }
        }
    }
}

function handleBackSpace() {
    if (displayInput.value.length === 0) {
        return;
    }
    let currentValue = displayInput.value.slice(0, displayInput.value.length - 1);
    let lastValue = displayInput.value[displayInput.value.length - 1];
    if (lastValue.match(/[.|+|*|\-|\/|%]/g)) {
        isDotOn = false
    }
    displayInput.value = currentValue;
    evaluateInputString = displayInput.value;
    document.querySelector("#display-input").focus()
}

function handleTrigonometryNormal(sign) {
    displayInput.value += (/[\d)IE]/.test(displayInput.value.slice(-1))) ?
        "*" + sign + "(" : sign + "(";
}

// function handleAbsolute(value) {
//     if ((/[\d)IE]/.test(displayInput.value.slice(-1)))) {
//         let splitArr = displayInput.value.split(/[+*\/]/);
//         let lastOprandDigit = splitArr.slice(-1)[0].length;
//         let cutBeforeInputString = displayInput.value.slice(0, (lastOprandDigit * -1));
//         displayInput.value = cutBeforeInputString + "|" + splitArr.slice(-1)[0] + "|";

//     }
//     else {
//         console.log("Invalid operation!!!");
//     }
// }


function handleXPower(power) {
    if ((/[\d)IE]/.test(displayInput.value.slice(-1)))) {
        let splitArr = displayInput.value.split(/[+\-*\/]/);
        let lastOprandDigit = splitArr.slice(-1)[0].length;
        let cutBeforeInputString = displayInput.value.slice(0, (lastOprandDigit * -1));
        displayInput.value = cutBeforeInputString + "(" + splitArr.slice(-1)[0];
        if (power === 2) {
            displayInput.value += ")^2";
        }
        else if (power === 3) {
            displayInput.value += ")^3";
        }
        else {
            displayInput.value += ")^";
        }
    }
    else {
        console.log("Invalid operation!!!");
    }
}

function getSin(number) {
    return Math.sin(Math.PI / 180 * number)
}

function getCos(number) {
    return Math.cos(Math.PI / 180 * number)
}

function getTan(number) {
    return Math.tan(Math.PI / 180 * number)
}

function getSinIn(number) {
    return 180 / Math.PI * Math.asin(number)
}

function getCosIn(number) {
    return 180 / Math.PI * Math.acos(number)
}

function getTanIn(number) {
    return 180 / Math.PI * Math.atan(number)
}

function getLog(number) {
    return Math.log10(number)
}

function getLn(number) {
    return Math.log(number)
}

function factorial(number) {
    if (number === 0) {
        return 1;
    }
    return number * factorial(number - 1);
}

function getStringInDigits() {
    let regexAndFunction = [
        {
            regPattern: /sin\((\d+\.?\d*)\)/g,
            callFunction: "getSin($1)"
        },
        {
            regPattern: /sin-1\((\d+\.?\d*)\)/g,
            callFunction: "getSinIn($1)"
        },
        {
            regPattern: /cos\((\d+\.?\d*)\)/g,
            callFunction: "getCos($1)"
        },
        {
            regPattern: /cos-1\((\d+\.?\d*)\)/g,
            callFunction: "getCosIn($1)"
        },
        {
            regPattern: /tan\((\d+\.?\d*)\)/g,
            callFunction: "getTan($1)"
        },
        {
            regPattern: /tan-1\((\d+\.?\d*)\)/g,
            callFunction: "getTanIn($1)"
        },
        {
            regPattern: /(\d+\.?\d*)\!/g,
            callFunction: "factorial($1)"
        },
        {
            regPattern: /log\((\d+\.?\d*)\)/g,
            callFunction: "getLog($1)"
        },
        {
            regPattern: /ln\((\d+\.?\d*)\)/g,
            callFunction: "getLn($1)"
        },
        {
            regPattern: /e/g,
            callFunction: "*2.718281828"
        },
        {
            regPattern: /π/g,
            callFunction: "*3.14159265359"
        },
    ]

    let convertedString = displayInput.value;

    regexAndFunction.map((regObject) => {
        convertedString = convertedString.replace(regObject.regPattern, regObject.callFunction)
    })

    return convertedString;
}

let lastIsOperator = false;
let isDotOn = false;

function handleCurrentInput(inputValue) {
    document.querySelector("#display-input").focus()
    switch (inputValue) {
        case 'abs-x':
            handleAbsolute(inputValue);
            break;

        case 'one-by-x':
            if (!(/[\d)IE]/.test(displayInput.value.slice(-1)))) {
                displayInput.value += "1/";
            }
            else {
                console.log("Invalid input!!!")
            }
            break;

        case 'log':
            handleTrigonometryNormal(inputValue);
            break;

        case 'ln':
            handleTrigonometryNormal(inputValue);
            break;

        case 'backspace':
            handleBackSpace();
            break;

        case 'sin':
            handleTrigonometryNormal(inputValue);
            break;

        case 'cos':
            handleTrigonometryNormal(inputValue);
            break;

        case 'tan':
            handleTrigonometryNormal(inputValue);
            break;

        case 'sin-1':
            handleTrigonometryNormal(inputValue);
            break;

        case 'cos-1':
            handleTrigonometryNormal(inputValue);
            break;

        case 'tan-1':
            handleTrigonometryNormal(inputValue);
            break;

        case '!':
            displayInput.value += "!";
            break;

        case 'x-raise-2':
            handleXPower(2);
            break;

        case 'x-raise-y':
            handleXPower();
            break;

        case '10-raise-x':
            displayInput.value += "10";
            handleXPower();
            break;

        case '+/-':
            handlePlusAndMinus(inputValue)
            break;

        case 'C':
            displayInput.value = "";
            isDotOn = false;
            minusOn = 1;
            document.querySelector("#display-input").focus()
            break

        case '=':
            if (areBracketsBalanced(displayInput.value)) {
                let valueInExp = getStringInDigits();
                const newValue = calculate(valueInExp);
                console.log(valueInExp);
                if (newValue === undefined || isNaN(newValue)) {
                    handleCurrentInput('C')
                    console.log("Invalid Input");
                }
                else {
                    displayInput.value = handleDisplayOutput(newValue)
                    document.querySelector("#display-input").focus()
                    minusOn = 1;
                }
            }
            else {
                handleCurrentInput('C')
                console.log("Invalid Parentheses");
            }
            break

        case 'lp':
            displayInput.value += '('
            break

        case 'rp':
            displayInput.value += ')'
            break

        default:
            handleDefaultCaseOfOperator(inputValue)
            break;
    }
}

document.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        handleCurrentInput("=")
    }
    else if (event.key === "Backspace") {
        event.preventDefault();
        handleCurrentInput("backspace")
    }
    else {
        event.preventDefault();
        handleCurrentInput(event.key)
    }
});


