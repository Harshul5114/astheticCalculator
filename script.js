let input = document.getElementById('inputBox')
let buttons = document.querySelectorAll('button')

let string = "";
let arr = Array.from(buttons);
arr.forEach(button => {
    button.addEventListener('click', (e) => {
        if (e.target.innerHTML == '=') {
            try {
                // Replace '×' with '*' so that eval can perform multiplication
                string = string.replace(/×/g, '*');
                let result = eval(string); // Evaluate the expression
                let resultStr = result.toString();
                const MAX_LENGTH = 11;

                // Check if the result string exceeds our desired length
                if (resultStr.length > MAX_LENGTH) {
                    // Check if the number has a decimal part (i.e. it's not an integer)
                    if (result % 1 !== 0) {
                        // Get the absolute integer part as a string (ignoring any sign)
                        let intPart = Math.floor(Math.abs(result)).toString();
                        let intLength = intPart.length;
                        // If the integer part is less than MAX_LENGTH,
                        // we can try to round the decimal portion
                        if (intLength < MAX_LENGTH) {
                            // Calculate allowed decimals: subtract integer length and 1 for the decimal point
                            let decimalsAllowed = MAX_LENGTH - intLength - 1;
                            let newResultStr = result.toFixed(decimalsAllowed);
                            // If the new string is within MAX_LENGTH, use it.
                            // (Sometimes trailing zeros or rounding may still produce a longer string.)
                            if (newResultStr.length <= MAX_LENGTH) {
                                resultStr = newResultStr;
                            } else {
                                resultStr = result.toExponential(6);
                            }
                        } else {
                            // Integer part is too long, so use scientific notation
                            resultStr = result.toExponential(6);
                        }
                    } else {
                        // Result is an integer but its length exceeds MAX_LENGTH; use scientific notation.
                        resultStr = result.toExponential(6);
                    }
                }
                string = resultStr;
                input.value = string;
            } catch (error) {
                string = ""
                input.value = "Error";
            }
            string = "";
        } else if (e.target.innerHTML == 'AC') {
            string = "";
            input.value = string;
        } else if (e.target.innerHTML == 'AC') {
            string = ""
            input.value = string;
        } else if (e.target.innerHTML == 'DEL') {
            string = string.slice(0, -1);
            input.value = string;

        } else if (e.target.innerHTML == '+/-') {
            // Toggle the sign of the current number (or expression)

            if (string.charAt(0) === '-') {
                string = string.slice(1); // Remove the negative sign
            } else {
                string = '-' + string; // Add the negative sign
            }
            input.value = string; // Update the display
            
        } else {
            string += e.target.innerHTML;
            input.value = string;
        }

        input.scrollLeft = input.scrollWidth;
    })
})


document.getElementById('themeToggle').addEventListener('change', function() {
    let theme = this.checked ? 'sleekTheme.css' : 'pastelTheme.css';
    document.getElementById('themeStylesheet').setAttribute('href', theme);
    localStorage.setItem('selected-theme', theme); // Save theme selection
});

// Load saved theme on page load
document.addEventListener('DOMContentLoaded', function() {
    let savedTheme = localStorage.getItem('selected-theme') || 'pastelTheme.css';
    document.getElementById('themeStylesheet').setAttribute('href', savedTheme);
    
    // Set switch position based on theme
    document.getElementById('themeToggle').checked = savedTheme === 'sleekTheme.css';
});