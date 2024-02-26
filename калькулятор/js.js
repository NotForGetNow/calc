document.addEventListener('DOMContentLoaded', function() {
    const inputDisplay = document.querySelector('.screen .input');
    const resultDisplay = document.querySelector('.screen .result');
    let currentInput = '';

    document.querySelectorAll('.keys span').forEach(key => {
        key.addEventListener('click', () => {
            const keyValue = key.textContent;
            if (keyValue === '=') {
                try {
                    const result = evaluateExpression(currentInput);
                    resultDisplay.textContent = result;
                    currentInput = result.toString(); // Reset current input to the result
                } catch (error) {
                    resultDisplay.textContent = 'Error';
                    currentInput = ''; // Clear current input on error
                }
            } else if (keyValue === 'del') {
                currentInput = currentInput.slice(0, -1);
                inputDisplay.textContent = currentInput;
            } else {
                currentInput += keyValue;
                inputDisplay.textContent = currentInput;
            }
        });
    });

    function evaluateExpression(expression) {
        // Using regex to split the expression into numbers and operators
        const tokens = expression.match(/(\d+(\.\d+)?|\+|\-|\*|\/)/g);
        if (!tokens) return 0; // If no valid tokens found, return 0

        // Evaluate the expression using a loop
        let result = parseFloat(tokens[0]); // Initialize result with the first number
        for (let i = 1; i < tokens.length; i += 2) {
            const operator = tokens[i];
            const operand = parseFloat(tokens[i + 1]);
            switch (operator) {
                case '+':
                    result += operand;
                    break;
                case '-':
                    result -= operand;
                    break;
                case '*':
                    result *= operand;
                    break;
                case '/':
                    if (operand === 0) throw new Error('Division by zero');
                    result /= operand;
                    break;
                default:
                    throw new Error('Invalid operator');
            }
        }
        return result;
    }
});
