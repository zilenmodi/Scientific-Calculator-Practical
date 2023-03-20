function areBracketsBalanced(expr) {
    // initialize an empty stack
    let stack = [];

    // loop through every character of the expression
    for (let i = 0; i < expr.length; i++) {
        let x = expr[i];

        // check if the current character is a bracket
        if (x !== '(' && x !== ')') {
            // if not a bracket, continue to the next character
            continue;
        }

        // check if the current character is an opening bracket
        if (x == '(') {
            // push the opening bracket to the stack
            stack.push(x);
            continue;
        }
        // if the current character is a closing bracket
        else if (stack.length && x === ')') {
            // remove the last opening bracket from the stack
            stack.pop();
        }
        // if the stack is empty and there is a closing bracket, brackets are not balanced
        else {
            return false;
        }
    }

    // if the stack is empty, brackets are balanced, else not
    return stack.length === 0;
}
