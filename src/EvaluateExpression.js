// Set the initial value of minusOn to 1
let minusOn = 1;

// Define a function to remove all spaces from the string
function trimSpaces(str) {
    let newStr = "";
    let i = 0;
    while (i < str.length) {
        if (str[i] !== ' ') {
            newStr += str[i]
        }
        i++;
    }
    return newStr;
}

// Define a function to perform the calculation for each operation
function cal(stack, currentNumber, sign) {
    if (sign === '+') {
        stack.push(minusOn * currentNumber);
    }
    else if (sign === '-') {
        stack.push(-currentNumber * minusOn);
    }
    else if (sign === '/') {
        stack.push(minusOn * stack.pop() / currentNumber);
    }
    else if (sign === '*') {
        stack.push(minusOn * stack.pop() * currentNumber);
    }
    else if (sign === '%') {
        stack.push(stack.pop() % currentNumber);
    }
    else if (sign === '^') {
        stack.push(Math.pow(stack.pop(), currentNumber));
    }
}

// Define the main calculation function
function calculate(s) {
    // Remove all spaces from the input string
    s = trimSpaces(s);
    // Initialize the stack and stack sign pair
    let stack = [];
    let stackSignPair = [];
    // Set the initial sign to '+'
    let sign = '+';
    // Loop through the characters of the input string
    for (let i = 0; i < s.length; i++) {
        // If the character is a letter, it must be a function
        if (s[i].match(/[a-z]/gi)) {
            let currentFunction = "";
            // Get the function name
            while (i < s.length && s[i] !== '(') {
                currentFunction += s[i]
                i++;
            }
            // If the function is getRoot, get the arguments and call the function
            if (currentFunction === "getRoot") {
                i++;
                let currentNumber1 = "";
                // Get the first argument
                while (i < s.length && s[i] !== ',') {
                    currentNumber1 += s[i]
                    i++;
                }
                i++;
                let currentNumber2 = "";
                // Get the second argument
                while (i < s.length && s[i] !== ')') {
                    currentNumber2 += s[i]
                    i++;
                }
                // If the input is invalid, return an error
                if (!currentNumber1.length || !currentNumber2.length || window[currentFunction] === undefined || (Number(currentNumber1) !== 3 && Number(currentNumber2) < 0)) {
                    handleError("Invalid Input!!!");
                    return;
                }
                // Calculate the function value and add it to the stack
                currentNumber1 = window[currentFunction](Number(calculate(currentNumber1)), Number(calculate(currentNumber2)));
                cal(stack, currentNumber1, sign);
            }
            // If the function is not getRoot, get the argument and call the function
            else {
                let currentNumber = "";
                // Get the argument
                while (i < s.length && s[i] !== ")") {
                    currentNumber += s[i]
                    i++;
                }
                // If the input is invalid, return an error
                if (!currentNumber.length || window[currentFunction] === undefined) {
                    handleError("Invalid Input!!!");
                    return;
                }
                // Calculate the function value and add it to the stack
                currentNumber = window[currentFunction](Number(calculate(currentNumber)));
                cal(stack, currentNumber, sign);
            }
        }
        else if (!isNaN(Number(s[i]))) {
            // If the character is a number or decimal, continue iterating until
            // the full number is obtained.
            let currentNumber = "";
            while (i < s.length && !isNaN(Number(s[i])) || s[i] === '.') {
                currentNumber += s[i]
                i++;
            }

            // Decrement i by 1 to account for the extra increment in the while loop.
            i--;

            // If currentNumber is empty, then there was no valid number in the input.
            // Throw an error and exit the function.
            if (!currentNumber.length) {
                handleError("Invalid Input!!!");
                return;
            }

            // Convert currentNumber to a number and call the cal function.
            currentNumber = Number(currentNumber);
            cal(stack, currentNumber, sign);

        }
        else if (s[i] === "(") {
            // If the character is an open parenthesis, push the current stack and sign
            // to stackSignPair and reset the stack and sign.
            stackSignPair.push([stack, sign]);
            stack = [];
            sign = '+'
        }
        else if (s[i] === ")") {
            // If the character is a closing parenthesis, calculate the current number
            // and retrieve the previous stack and sign from stackSignPair. Call the cal
            // function with the retrieved stack, current number, and sign.
            let currentNumber = stack.reduce((acc, curr) => acc += curr, 0)
            let getPair = stackSignPair.pop();
            [stack, sign] = getPair;
            cal(stack, currentNumber, sign)
        }
        else {
            if (i > 0 && s[i] === '-' && s[i - 1].match(/[+|*|\-|\/]/gi)) {
                // If the character is a minus sign and the previous character is an operator,
                // set minusOn to -1 to handle negative numbers.
                minusOn = -1;
            }
            else {
                // If the character is not a number, decimal, or parenthesis, set the sign
                // to the current character and set minusOn to 1.
                sign = s[i];
                minusOn = 1;
            }
        }
    }

    // Calculate the final result by reducing the stack and returning the sum.
    let acc = stack.reduce((acc, curr) => acc += curr, 0)
    return acc;
};