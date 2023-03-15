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
            // else if ((i - 1 >= 0 && currentDisplayInput[i] == '-' && currentDisplayInput[i - 1] != '-' && notInRange(currentDisplayInput[i - 1]))) {
            //     let newValue = `${currentDisplayInput.slice(i + 1)}`;
            //     let oldValue = currentDisplayInput.slice(0, i);
            //     displayInput.value = `${oldValue}${newValue}`
            // }
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
        return value;
    }
    else if (value < 0 && !((value * -1) % 1)) {
        return value;
    }
    else if (value < 0) {
        // value *= -1;
        valueArr = value.toString().split('');
        let isDot = false;
        let totalDigit = valueArr.reduce((acc, curr) => {
            if (isDot) acc++;
            if (curr === '.') {
                isDot = true;
            }
            return acc;
        }, 0)
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
        return totalDigit >= 3 ? Number(value).toFixed(3) : Number(value)
    }
}

function handleDefaultCaseOfOperator(inputValue) {
    if (inputValue.match(/[a-df-z]/gi)) {
        console.log("Invalid data");
        return;
    }

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
        displayInput.value += "0."
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
    document.querySelector("#display-input").focus()
}

let lastIsOperator = false;
let isDotOn = false;

function handleCurrentInput(inputValue) {
    switch (inputValue) {
        case 'backspace':
            handleBackSpace();
            break;

        case '+/-':
            handlePlusAndMinus(inputValue)
            break;

        case 'C':
            displayInput.value = ""
            document.querySelector("#display-input").focus()
            break

        case '=':
            if (areBracketsBalanced(displayInput.value)) {
                const newValue = calculate(displayInput.value)
                if (newValue === undefined || isNaN(newValue)) {
                    handleCurrentInput('C')
                    console.log("Invalid Input");
                }
                else {
                    displayInput.value = handleDisplayOutput(newValue)
                    document.querySelector("#display-input").focus()
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

        case '.':
            if (!isDotOn) {
                displayInput.value += '.'
            }
            isDotOn = true;
            break;

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


