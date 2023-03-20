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

//dropdownTriangle: click event is used to open dropdown menu for trigonometry.
dropdownTriangle.addEventListener("click", (e) => {
    dropdownModalTriangle.classList.contains('none') ? dropdownModalTriangle.classList.remove('none') : dropdownModalTriangle.classList.add('none')

    if (!dropdownModalFunction.classList.contains('none')) {
        dropdownModalFunction.classList.add('none')
    }
}, true)

//dropdownFunction: click event is used to open dropdown menu for functions.
dropdownFunction.addEventListener("click", () => {
    dropdownModalFunction.classList.contains('none') ? dropdownModalFunction.classList.remove('none') : dropdownModalFunction.classList.add('none')

    if (!dropdownModalTriangle.classList.contains('none')) {
        dropdownModalTriangle.classList.add('none')
    }
})

//degButton: click event is used for toggle DEG and RAD.
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

//toggleButtonSecond: click event is used for toggle functions like x^2 => x^3, log(x) => log2(x)
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

//handleError function is used to handle errors in calculator like: "invalid input"
const errorMessageHandler = document.querySelector("#error-message-handler");
function handleError(message) {
    errorMessageHandler.innerHTML = `<p class='error-msg'>${message}</p>`
    setTimeout(() => {
        errorMessageHandler.innerHTML = ""
    }, 1000)
}

//notInRange is used to check value is in range or not
function notInRange(value) {
    if (value >= '1' && value <= '9') {
        return false;
    }
    return true;
}

//handlePlusAndMinus function is used to handle +/- event. When user click on this, it will toggle value to plus to minus and vice versa.
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

//handleDisplayOutput function is used to handle display output: +int, -int, +frac, -frac.
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
        //last is op, and current is (-), So simply add it.
        displayInput.value += "-"

    }
    else if (lastIsOperator && inputValue.match(/[+|*|\/|%]/g)) {
        //last is op, and current is (+,*,/,%), change with current.
        let currentValue = displayInput.value.slice(0, currentDisplayLength - 1);
        displayInput.value = currentValue + inputValue

    }
    else if ((currentDisplayLength && displayInput.value[currentDisplayLength - 1] === '(' && inputValue === ".") || (!currentDisplayLength && inputValue === '.') || (lastIsOperator && inputValue === '.')) {
        //once dot op is came, then dot can't came again until next operator.
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

//handleBackSpace function is used when user click on backspace to handle dots and other operators.
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

//handleTrigonometryNormal function is used to check last is operator or not, If last is operand,So add "*(" sign otherwise "(".
function handleTrigonometryNormal(sign) {
    displayInput.value += (/[!\d)IE]/.test(displayInput.value.slice(-1))) ?
        "*" + sign + "(" : sign + "(";
}

//handleSingleValueInput function is used to check last is operator or not, If last is operand,So add "*sign" sign otherwise "sign".
function handleSingleValueInput(sign) {
    displayInput.value += (/[eπ\d)IE]/.test(displayInput.value.slice(-1))) ? "*" + sign : sign;
}

//handleXPower is used to handle, (x)^2, (x)^3 ,(10)^x ,(2)^x and (x)^y
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

//handleXRoot is used to handle, 2root(x), 3root(x) and yroot(x)
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

//handle memory functions like MS, M+, M-, MC, MR
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

// Define an array of objects containing regular expressions and their corresponding function calls
function getStringInDigits() {
    let regexAndFunction = [
        {
            regPattern: /e/g, // Regular expression to match 'e'
            callFunction: "2.718281828" // Call this string as a replacement
        },
        {
            regPattern: /π/g, // Regular expression to match 'π'
            callFunction: "3.14159265359" // Call this string as a replacement
        },
        {
            regPattern: /(\d+\.?\d*)\√(\-?\d+\.?\d*)/g, // Regular expression to match a square root expression
            callFunction: "getRoot($1, $2)" // Call the getRoot() function with the matched numbers as arguments
        },
        {
            regPattern: /sin\((\d+[\/\.]?\d*)\)/g, // Regular expression to match a sine expression
            callFunction: "getSin($1)" // Call the getSin() function with the matched number as an argument
        },
        {
            regPattern: /sin-1\((\d+[\/\.]?\d*)\)/g, // Regular expression to match an inverse sine expression
            callFunction: "getSinIn($1)" // Call the getSinIn() function with the matched number as an argument
        },
        {
            regPattern: /cos\((\d+[\/\.]?\d*)\)/g, // Regular expression to match a cosine expression
            callFunction: "getCos($1)" // Call the getCos() function with the matched number as an argument
        },
        {
            regPattern: /cos-1\((\d+[\/\.]?\d*)\)/g, // Regular expression to match an inverse cosine expression
            callFunction: "getCosIn($1)" // Call the getCosIn() function with the matched number as an argument
        },
        {
            regPattern: /tan\((\d+[\/\.]?\d*)\)/g, // Regular expression to match a tangent expression
            callFunction: "getTan($1)" // Call the getTan() function with the matched number as an argument
        },
        {
            regPattern: /tan-1\((\d+[\/\.]?\d*)\)/g, // Regular expression to match an inverse tangent expression
            callFunction: "getTanIn($1)" // Call the getTanIn() function with the matched number as an argument
        },
        {
            regPattern: /(\d+\.?\d*)\!/g, // Regular expression to match a factorial expression
            callFunction: "factorial($1)" // Call the factorial() function with the matched number as an argument
        },
        {
            regPattern: /log\((\d+\.?\d*)\)/g, // Regular expression to match a base-10 logarithm expression
            callFunction: "getLog($1)" // Call the getLog() function with the matched number as an argument
        },
        {
            regPattern: /log2\((\d+\.?\d*)\)/g, // Regular expression to match a base-2 logarithm expression
            callFunction: "getLog2($1)" // Call the getLog2() function with the matched number as an argument
        },
        {
            regPattern: /ln\((\d+\.?\d*)\)/g, // Regular expression to match a ln  expression
            callFunction: "getLn($1)"  // Call the getLn() function with the matched number as an argument
        },

    ]

    let convertedString = displayInput.value;

    regexAndFunction.map((regObject) => {
        convertedString = convertedString.replace(regObject.regPattern, regObject.callFunction)
    })

    return convertedString;
}

function handleCurrentInput(inputValue) {
    // Set focus on the display input
    document.querySelector("#display-input").focus()

    // Switch statement to handle various input values
    switch (inputValue) {

        // Memory store functions
        case 'm-s':
            // Call handleCurrentInput with "=" to evaluate the current input
            handleCurrentInput("=");
            // Convert display input to a number and store it in memory
            displayInput.value = Number(displayInput.value);
            handleMemoryStore(Number(displayInput.value));
            break;

        case 'm-plus':
            // Call handleCurrentInput with "=" to evaluate the current input
            handleCurrentInput("=");
            // Convert display input to a number and add it to the value in memory
            displayInput.value = Number(displayInput.value);
            handleMemoryStore(Number(memoryValue) + Number(displayInput.value));
            break;

        case 'm-minus':
            // Call handleCurrentInput with "=" to evaluate the current input
            handleCurrentInput("=");
            // Convert display input to a number and subtract it from the value in memory
            displayInput.value = Number(displayInput.value);
            handleMemoryStore(Number(memoryValue) - Number(displayInput.value));
            break;

        case 'm-recall':
            // Display the value stored in memory
            displayInput.value = memoryValue
            break;

        case 'm-clear':
            // Clear the value in memory
            handleMemoryStore(0);
            break;

        // Exponential functions
        case 'f-e':
            // Call handleCurrentInput with "=" to evaluate the current input
            handleCurrentInput("=");
            // Convert display input to a number and display it in exponential notation with 2 decimal places
            displayInput.value = Number(displayInput.value).toExponential(2)
            break;

        case '2-root-x':
            // Calculate the square root of the current input value
            handleXRoot(2);
            break;

        case '3-root-x':
            // Calculate the cube root of the current input value
            handleXRoot(3);
            break;

        case 'y-root-x':
            // Add the square root symbol to the display input
            displayInput.value += '√'
            break;

        case 'e':
            // Handle input of the constant e
            handleSingleValueInput(inputValue);
            break;

        case 'exp':
            // Handle exponential function with base e
            handleSingleValueInput("e");
            handleXPower("e");
            break;

        case 'e-raise-x':
            // Handle e to the power of x
            handleSingleValueInput("e");
            handleXPower("e");
            break;

        case 'π':
            // Handle input of the constant pi
            handleSingleValueInput(inputValue);
            break;

        case 'rnd':
            // Generate a random number and display it with 8 decimal places
            let rndValue = Math.random();
            handleSingleValueInput(rndValue.toFixed(8).toString());
            break;

        // Math functions
        case 'abs-x':
            // Calculate the absolute value of the current input value
            handleCurrentInput("=");
            displayInput.value = Math.abs(Number(displayInput.value))
            break;

        case 'floor-x':
            // Calculate the floor of the current input value
            handleCurrentInput("=");
            displayInput.value = Math.floor(Number(displayInput.value))
            break;

        case 'ceil-x':
            // Calculate the ceiling of the current input value
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
            // Handle logarithm with base 10
            handleTrigonometryNormal(inputValue);
            break;

        case 'log-x-base2':
            // Handle logarithm with base 2
            handleTrigonometryNormal("log2");
            break;

        case 'ln':
            // Handle natural logarithm
            handleTrigonometryNormal(inputValue);
            break;

        case 'backspace':
            // Handle backspace key
            handleBackSpace();
            break;

        case 'sin':
            // Handle sine function
            handleTrigonometryNormal(inputValue);
            break;

        case 'cos':
            // Handle cosine function
            handleTrigonometryNormal(inputValue);
            break;

        case 'tan':
            // Handle tangent function
            handleTrigonometryNormal(inputValue);
            break;

        case 'sin-1':
            // Handle inverse sine function
            handleTrigonometryNormal(inputValue);
            break;

        case 'cos-1':
            // Handle inverse cosine function
            handleTrigonometryNormal(inputValue);
            break;

        case 'tan-1':
            // Handle inverse tangent function
            handleTrigonometryNormal(inputValue);
            break;

        case '!':
            // Handle factorial operator
            handleFactorial();
            break;

        case 'x-raise-2':
            // Handle x raised to power 2
            handleXPower(2);
            break;

        case 'x-raise-3':
            // Handle x raised to power 3
            handleXPower(3);
            break;

        case 'x-raise-y':
            // Handle custom x raised to y power
            handleXPower();
            break;

        case '10-raise-x':
            // Append 10 to the display input and handle custom x raised to y power
            displayInput.value += "10";
            handleXPower();
            break;

        case '2-raise-x':
            // Append 2 to the display input and handle custom x raised to y power
            displayInput.value += "2";
            handleXPower();
            break;

        case '+/-':
            // Handle plus/minus operator
            handlePlusAndMinus(inputValue)
            break;

        case 'C':
            // Clear the display input and reset all flags to their default values
            displayInput.value = "";
            minusOn = 1;
            toggleButtonSecondOn = false;
            isDegOn = true;
            lastIsOperator = false;
            isDotOn = false;
            document.querySelector("#display-input").focus()
            break;


        case '=':
            // Check if brackets are balanced in the expression
            if (areBracketsBalanced(displayInput.value)) {
                // Get the string in digits from the display input
                let valueInExp = getStringInDigits();
                // console.log(valueInExp);
                // Calculate the result of the expression
                const newValue = calculate(valueInExp);
                // If the calculated value is undefined or NaN, show an error message
                if (newValue === undefined || isNaN(newValue)) {
                    handleError("Invalid Input!!!")
                }
                // If the calculated value is zero, clear the display input
                else {
                    if (newValue === 0) {
                        displayInput.value = "";
                    }
                    // Otherwise, update the display input with the calculated value
                    else {
                        displayInput.value = handleDisplayOutput(newValue)
                    }
                    // Set the focus back to the display input and update the state of the calculator
                    document.querySelector("#display-input").focus()
                    minusOn = 1;
                }
            }
            // If the brackets are not balanced, show an error message
            else {
                handleError("Invalid Parentheses!!!")
            }
            break

        case 'lp':
            // Handle the input of a left parenthesis
            handleSingleValueInput('(');
            break

        case 'rp':
            // Add a right parenthesis to the display input
            displayInput.value += ')'
            break

        default:
            // Handle the default case for an operator input
            handleDefaultCaseOfOperator(inputValue)
            break;
    }
}

// Add an event listener to the document that listens for key presses
document.addEventListener("keypress", function (event) {
    // Prevent the default behavior of the keypress event (e.g., prevent the Enter key from submitting a form)
    event.preventDefault();
    // Check if the key pressed is the Enter key
    if (event.key === "Enter") {
        // If so, call the handleCurrentInput function with an argument of "="
        handleCurrentInput("=")
    }
    // Check if the key pressed is the Backspace key
    else if (event.key === "Backspace") {
        // If so, call the handleCurrentInput function with an argument of "backspace"
        handleCurrentInput("backspace")
    }
    // Check if the key pressed is a letter (a-z or A-Z)
    else if (event.key.match(/[a-z]/gi)) {
        // If so, call the handleError function with an argument of "Invalid Input!!!"
        handleError("Invalid Input!!!")
    }
    // If none of the above conditions are met, the key pressed must be a number or operator
    else {
        // Call the handleCurrentInput function with an argument of the key pressed
        handleCurrentInput(event.key)
    }
});