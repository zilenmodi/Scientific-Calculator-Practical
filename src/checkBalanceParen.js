function areBracketsBalanced(expr) {
    let stack = [];
    for (let i = 0; i < expr.length; i++) {
        let x = expr[i];
        if (x !== '(' && x !== ')') {
            continue;
        }

        if (x == '(') {
            stack.push(x);
            continue;
        }
        else if (stack.length && x === ')') {
            stack.pop();
        }
        else {
            return false;
        }
    }

    return stack.length === 0;
}