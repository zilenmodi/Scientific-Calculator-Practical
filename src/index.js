let toggleButtonSecondOn = false;
let isDegOn = true;
let memoryValue = 0;
let lastIsOperator = false;
let isDotOn = false;

const dropdownFunctions = document.querySelectorAll(".calculator-tf-trigonometry")

const dropdownTriangle = dropdownFunctions[0];
const dropdownFunction = dropdownFunctions[1];

const displayInput = document.querySelector("#display-input");

const dropdownModalTriangle = document.querySelector(".calculator-tf-modal-1")

const dropdownModalFunction = document.querySelector(".calculator-tf-modal-2")

dropdownTriangle.addEventListener("click", (e) => {
    dropdownModalTriangle.classList.contains('none') ? dropdownModalTriangle.classList.remove('none') : dropdownModalTriangle.classList.add('none')

    if (!dropdownModalFunction.classList.contains('none')) {
        dropdownModalFunction.classList.add('none')
    }
}, true)


dropdownFunction.addEventListener("click", () => {
    dropdownModalFunction.classList.contains('none') ? dropdownModalFunction.classList.remove('none') : dropdownModalFunction.classList.add('none')

    if (!dropdownModalTriangle.classList.contains('none')) {
        dropdownModalTriangle.classList.add('none')
    }
})

const degButton = document.querySelector("#op-deg");
degButton.addEventListener("click", () => {
    isDegOn = !isDegOn;
    console.log(isDegOn);
    if (isDegOn) {
        degButton.style.background = "#e9ecef"
        degButton.style.color = "#000"
        degButton.innerHTML = "<p>DEG</p>"
    }
    else {
        degButton.style.background = "#92c2e8"
        degButton.style.color = "#f5f5f6"
        degButton.innerHTML = "<p>RAD</p>"
    }
})

const toggleButtonSecond = document.querySelector("#op-toggle-second");
toggleButtonSecond.addEventListener("click", () => {
    toggleButtonSecondOn = !toggleButtonSecondOn;
    let toggleButtonsOfSecond = document.querySelectorAll('.toggle-item')
    if (toggleButtonSecondOn) {
        toggleButtonSecond.style.background = "#92c2e8"
        toggleButtonSecond.style.color = "#f5f5f6"
        toggleButtonsOfSecond[0].innerHTML = "<p>x<sup>3</sup></p>";
        toggleButtonsOfSecond[0].setAttribute('onClick', "handleCurrentInput('x-raise-3')")

        toggleButtonsOfSecond[1].innerHTML = "<p>3&radic;x</p>";
        toggleButtonsOfSecond[1].setAttribute('onClick', "handleCurrentInput('3-root-x')")

        toggleButtonsOfSecond[2].innerHTML = "<p>y&radic;x</p>";
        toggleButtonsOfSecond[2].setAttribute('onClick', "handleCurrentInput('y-root-x')")

        toggleButtonsOfSecond[3].innerHTML = "<p>2<sup>x</sup></p>";
        toggleButtonsOfSecond[3].setAttribute('onClick', "handleCurrentInput('2-raise-x')")

        toggleButtonsOfSecond[4].innerHTML = "<p>log<sub>2</sub>x</p>";
        toggleButtonsOfSecond[4].setAttribute('onClick', "handleCurrentInput('log-x-base2')")

        toggleButtonsOfSecond[5].innerHTML = "<p>e<sup>x</sup></p>";
        toggleButtonsOfSecond[5].setAttribute('onClick', "handleCurrentInput('e-raise-x')")
    }
    else {
        toggleButtonSecond.style.background = "#f5f5f6"
        toggleButtonSecond.style.color = "#454545"
        toggleButtonsOfSecond[0].innerHTML = "<p>x<sup>2</sup></p>";
        toggleButtonsOfSecond[0].setAttribute('onClick', "handleCurrentInput('x-raise-2')")

        toggleButtonsOfSecond[1].innerHTML = "<p>2&radic;x</p>";
        toggleButtonsOfSecond[1].setAttribute('onClick', "handleCurrentInput('2-root-x')")

        toggleButtonsOfSecond[2].innerHTML = "<p>x<sup>y</sup></p>";
        toggleButtonsOfSecond[2].setAttribute('onClick', "handleCurrentInput('x-raise-y')")

        toggleButtonsOfSecond[3].innerHTML = "<p>10<sup>x</sup></p>";
        toggleButtonsOfSecond[3].setAttribute('onClick', "handleCurrentInput('10-raise-x')")

        toggleButtonsOfSecond[4].innerHTML = "<p>log</p>";
        toggleButtonsOfSecond[4].setAttribute('onClick', "handleCurrentInput('log')")

        toggleButtonsOfSecond[5].innerHTML = "<p>ln</p>";
        toggleButtonsOfSecond[5].setAttribute('onClick', "handleCurrentInput('ln')")
    }

})

const errorMessageHandler = document.querySelector("#error-message-handler");
function handleError(message) {
    errorMessageHandler.innerHTML = `<p class='error-msg'>${message}</p>`
    setTimeout(() => {
        errorMessageHandler.innerHTML = ""
    }, 1000)
}

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
        else if (inputValue.match(/[+|*|\-|\/|%]/g)) {
            lastIsOperator = true;
            isDotOn = false;
            displayInput.value += inputValue;
            document.querySelector("#display-input").focus()
        }
        else {
            lastIsOperator = false;
            if ((/[πe)!]/.test(displayInput.value.slice(-1)))) {
                displayInput.value += "*" + inputValue;
                document.querySelector("#display-input").focus()
            }
            else {
                displayInput.value += inputValue;
                document.querySelector("#display-input").focus()
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
    displayInput.value += (/[!\d)IE]/.test(displayInput.value.slice(-1))) ?
        "*" + sign + "(" : sign + "(";
}

function handleSingleValueInput(sign) {
    displayInput.value += (/[eπ\d)IE]/.test(displayInput.value.slice(-1))) ? "*" + sign : sign;
}

function handleXPower(power) {
    if ((/[e\d)IE]/.test(displayInput.value.slice(-1)))) {
        let splitArr = displayInput.value.split(/[+\-*\/]/);
        let lastOprandDigit = splitArr.slice(-1)[0].length;
        let cutBeforeInputString = displayInput.value.slice(0, (lastOprandDigit * -1));
        displayInput.value = cutBeforeInputString + "(" + splitArr.slice(-1)[0];
        if (power === 2) {
            displayInput.value += ")^2";
        }
        else if (power === "e") {
            displayInput.value += "^";
        }
        else if (power === 3) {
            displayInput.value += ")^3";
        }
        else {
            displayInput.value += ")^";
        }
    }
    else {
        handleError("Invalid operation!!!")
    }
}

function handleXRoot(power) {
    lastIsOperator = true;
    displayInput.value += (/[\d)IE]/.test(displayInput.value.slice(-1))) ? "*" : "";
    if (power === 2) {
        displayInput.value += "2√";
    }
    else if (power === 3) {
        displayInput.value += "3√";
    }
}

function handleMemoryStore(value) {
    memoryValue = value;
    if (memoryValue !== 0) {
        document.querySelector("#memory-store").style.display = "block"
        document.querySelector("#op-mc").classList.remove('grid-item-muted')
        document.querySelector("#op-mc").classList.add('grid-item-deg-fe')

        document.querySelector("#op-mr").classList.remove('grid-item-muted')
        document.querySelector("#op-mr").classList.add('grid-item-deg-fe')

        document.querySelector("#memory-store").style.display = "block"
        document.querySelector("#memory-value").textContent = memoryValue
    }
    else {
        document.querySelector("#op-mc").classList.add('grid-item-muted')
        document.querySelector("#op-mc").classList.remove('grid-item-deg-fe')

        document.querySelector("#op-mr").classList.add('grid-item-muted')
        document.querySelector("#op-mr").classList.remove('grid-item-deg-fe')

        document.querySelector("#memory-store").style.display = "none"
        document.querySelector("#memory-value").textContent = memoryValue
    }
}

function getSin(number) {
    return isDegOn ? Math.sin(Math.PI / 180 * number) : Math.sin(number);
}

function getCos(number) {
    return isDegOn ? Math.cos(Math.PI / 180 * number) : Math.cos(number);
}

function getTan(number) {
    return isDegOn ? Math.tan(Math.PI / 180 * number) : Math.tan(number);
}

function getSinIn(number) {
    return isDegOn ? 180 / Math.PI * Math.asin(number) : Math.asin(number)
}

function getCosIn(number) {
    return isDegOn ? 180 / Math.PI * Math.acos(number) : Math.acos(number)
}

function getTanIn(number) {
    return isDegOn ? 180 / Math.PI * Math.atan(number) : Math.atan(number)
}

function getLog(number) {
    return Math.log10(number)
}

function getLog2(number) {
    return Math.log2(number)
}

function getLn(number) {
    return Math.log(number)
}

function factorial(number) {
    try {
        if (number === 0) {
            return 1;
        }
        return number * factorial(number - 1);
    }
    catch {
        return;
    }
}

function getRoot(root, value) {
    return Math.pow(Math.abs(value), 1 / root);
}

function handleFactorial() {
    if ((/[\d]/.test(displayInput.value.slice(-1)))) {
        displayInput.value += "!";
    }
    else {
        handleError("Invalid Input!!!")
    }
}

function getStringInDigits() {
    let regexAndFunction = [
        {
            regPattern: /e/g,
            callFunction: "2.718281828"
        },
        {
            regPattern: /π/g,
            callFunction: "3.14159265359"
        },
        {
            regPattern: /(\d+\.?\d*)\√(\-?\d+\.?\d*)/g,
            callFunction: "getRoot($1, $2)"
        },
        {
            regPattern: /sin\((\d+[\/\.]?\d*)\)/g,
            callFunction: "getSin($1)"
        },
        {
            regPattern: /sin-1\((\d+[\/\.]?\d*)\)/g,
            callFunction: "getSinIn($1)"
        },
        {
            regPattern: /cos\((\d+[\/\.]?\d*)\)/g,
            callFunction: "getCos($1)"
        },
        {
            regPattern: /cos-1\((\d+[\/\.]?\d*)\)/g,
            callFunction: "getCosIn($1)"
        },
        {
            regPattern: /tan\((\d+[\/\.]?\d*)\)/g,
            callFunction: "getTan($1)"
        },
        {
            regPattern: /tan-1\((\d+[\/\.]?\d*)\)/g,
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
            regPattern: /log2\((\d+\.?\d*)\)/g,
            callFunction: "getLog2($1)"
        },
        {
            regPattern: /ln\((\d+\.?\d*)\)/g,
            callFunction: "getLn($1)"
        },

    ]

    let convertedString = displayInput.value;

    regexAndFunction.map((regObject) => {
        convertedString = convertedString.replace(regObject.regPattern, regObject.callFunction)
    })

    return convertedString;
}


function handleCurrentInput(inputValue) {
    document.querySelector("#display-input").focus()
    switch (inputValue) {
        case 'm-s':
            handleCurrentInput("=");
            displayInput.value = Number(displayInput.value);
            handleMemoryStore(Number(displayInput.value));
            break;

        case 'm-plus':
            handleCurrentInput("=");
            displayInput.value = Number(displayInput.value);
            handleMemoryStore(Number(memoryValue) + Number(displayInput.value));
            break;

        case 'm-minus':
            handleCurrentInput("=");
            displayInput.value = Number(displayInput.value);
            handleMemoryStore(Number(memoryValue) - Number(displayInput.value));
            break;

        case 'm-recall':
            displayInput.value = memoryValue
            break;

        case 'm-clear':
            handleMemoryStore(0);
            break;

        case 'f-e':
            handleCurrentInput("=");
            displayInput.value = Number(displayInput.value).toExponential(2)
            break;

        case '2-root-x':
            handleXRoot(2);
            break;

        case '3-root-x':
            handleXRoot(3);
            break;

        case 'y-root-x':
            displayInput.value += '√'
            break;

        case 'e':
            handleSingleValueInput(inputValue);
            break;

        case 'exp':
            handleSingleValueInput("e");
            handleXPower("e");
            break;

        case 'e-raise-x':
            handleSingleValueInput("e");
            handleXPower("e");
            break;

        case 'π':
            handleSingleValueInput(inputValue);
            break;

        case 'rnd':
            let rndValue = Math.random();
            handleSingleValueInput(rndValue.toFixed(8).toString());
            break;

        case 'abs-x':
            handleCurrentInput("=");
            displayInput.value = Math.abs(Number(displayInput.value))
            break;

        case 'floor-x':
            handleCurrentInput("=");
            displayInput.value = Math.floor(Number(displayInput.value))
            break;

        case 'ceil-x':
            handleCurrentInput("=");
            displayInput.value = Math.ceil(Number(displayInput.value))
            break;

        case 'one-by-x':
            if (!(/[\d)IE]/.test(displayInput.value.slice(-1)))) {
                displayInput.value += "1/";
            }
            else {
                handleError("Invalid Input!!!")
            }
            break;

        case 'log':
            handleTrigonometryNormal(inputValue);
            break;

        case 'log-x-base2':
            handleTrigonometryNormal("log2");
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
            handleFactorial();
            break;

        case 'x-raise-2':
            handleXPower(2);
            break;

        case 'x-raise-3':
            handleXPower(3);
            break;

        case 'x-raise-y':
            handleXPower();
            break;

        case '10-raise-x':
            displayInput.value += "10";
            handleXPower();
            break;

        case '2-raise-x':
            displayInput.value += "2";
            handleXPower();
            break;

        case '+/-':
            handlePlusAndMinus(inputValue)
            break;

        case 'C':
            displayInput.value = "";
            minusOn = 1;
            toggleButtonSecondOn = false;
            isDegOn = true;
            lastIsOperator = false;
            isDotOn = false;
            document.querySelector("#display-input").focus()
            break

        case '=':
            if (areBracketsBalanced(displayInput.value)) {
                let valueInExp = getStringInDigits();
                // console.log(valueInExp);
                const newValue = calculate(valueInExp);
                if (newValue === undefined || isNaN(newValue)) {
                    handleError("Invalid Input!!!")
                }
                else {
                    if (newValue === 0) {
                        displayInput.value = "";
                    }
                    else {
                        displayInput.value = handleDisplayOutput(newValue)
                    }
                    document.querySelector("#display-input").focus()
                    minusOn = 1;
                }
            }
            else {
                // handleCurrentInput('C')
                handleError("Invalid Parentheses!!!")
            }
            break

        case 'lp':
            handleSingleValueInput('(');
            break

        case 'rp':
            displayInput.value += ')'
            break

        default:
            handleDefaultCaseOfOperator(inputValue)
            break;
    }
}

document.addEventListener("keypress", function (event) {
    if (event.key.match(/[a-z]/gi)) {
        event.preventDefault();
        handleError("Invalid Input!!!")
    }
    else if (event.key === "Enter") {
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


/*
We required your digital signature for our college report. As you may know, a digital signature is required for presenting the report to college, and We would be grateful if you could provide us with one.

*/