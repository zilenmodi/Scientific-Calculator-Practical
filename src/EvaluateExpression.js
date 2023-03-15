let minusOn = 1;

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

function calculate(s) {
    s = trimSpaces(s);
    let stack = [];
    let stackSignPair = [];
    let sign = '+';
    for (let i = 0; i < s.length; i++) {
        if (!isNaN(Number(s[i]))) {
            let currentNumber = "";
            while (!isNaN(Number(s[i])) || s[i] === '.') {
                currentNumber += s[i]
                i++;
            }

            i--;
            currentNumber = Number(currentNumber);
            cal(stack, currentNumber, sign);

        }
        else if (s[i] === "(") {

            stackSignPair.push([stack, sign]);
            stack = [];
            sign = '+'
        }
        else if (s[i] === ")") {

            let currentNumber = stack.reduce((acc, curr) => acc += curr, 0)
            let getPair = stackSignPair.pop();
            [stack, sign] = getPair;
            cal(stack, currentNumber, sign)
        }
        else {
            if (i > 0 && s[i] === '-' && s[i - 1].match(/[+|*|\-|\/]/gi)) {
                minusOn = -1;
            }
            else {
                sign = s[i];
                minusOn = 1;
            }
        }
    }

    let acc = stack.reduce((acc, curr) => acc += curr, 0)
    return acc;
};