function add(a, b) {
    return parseFloat(a) + parseFloat(b);
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}


function operate(operator, a, b) {
    return window[operator](a, b);
}

function clear() {
    a = '';
    b = '';
    operator = '';
    operatorSymbol = '';
    showDisplay();
}

function showDisplay() {
    return display.textContent = a.concat(operatorSymbol, b);
}

function failDivide() {
    if (b === '0' && operator === 'divide') {
        clear();
        display.textContent = 'Dividing by 0 not allowed'
        return 'failed';
    }
}

function failDecimal(id, variable) {
    let temp = variable;
    if (id === '.' && temp.includes('.')) {
        clear();
        display.textContent = '2 decimal points in 1 number not allowed'
        return 'failed';
    }
}

let a = '';
let b = '';
let operator = '';
let operatorSymbol = '';
let display = document.querySelector('#screen-text');

// when person punches in number
let numbers = document.querySelectorAll('.numbers');
numbers.forEach(number => number.addEventListener('click', function(e) {
    // if before operator, store as a
    if (operator === '') {
        if (failDecimal(e.target.id, a) == 'failed') {
            return;
        }
        a = a.concat(e.target.id);
    }
        // if after operator, store as b
        else {
            if (failDecimal(e.target.id, b) == 'failed') {
                return;
            }
            b = b.concat(e.target.id);
        }
    // display
    showDisplay();
}));
    

// when person punches in operator other than equals sign
let operators = document.querySelectorAll('.operator');
operators.forEach(opbtn => opbtn.addEventListener('click', function(e) {
    // if no other operator on screen, store operator and display
    if (operator === '') {
        if (a === '') {
            clear();
            display.textContent = 'Input operand first';
            return;
        }
        operator = e.target.id;
        operatorSymbol = e.target.dataset.symbol;
        showDisplay();
    }
    // if another operator already on screen, operate on the values already stored.
        else {
            if (b === '') {
                clear();
                display.textContent = '2 operators in row not allowed'
                return;
            }
            if (failDivide() == 'failed') {
                return;
            }
            let temp = operate(operator, a, b)
            // store new value as a. store current operator as operator.
            a = temp.toString();
            operator = e.target.id;
            operatorSymbol = e.target.dataset.symbol;
            b = '';
            showDisplay();
        }
}));

// when person punches in equals sign
let equals = document.querySelector('#equals');
equals.addEventListener('click', function() {
    if (a === '' || b === '' || operator === '') {
        clear();
        display.textContent = '2 operands and 1 operator required'
        return;
    }
    if (failDivide() == 'failed') {
        return;
    }
    // operate with current values
    let temp = operate(operator, a, b);
    // display return value
    a = temp.toString();
    operator = '';
    operatorSymbol = '';
    b = '';
    showDisplay();
});

// when person pushes clear button
let clearbtn = document.querySelector('#c');
clearbtn.addEventListener('click', clear);

// when person pushes . button: checks
/* let dot = document.querySelector("#dot");
dot.addEventListener('click', function() {
    if (a.includes('.')
}); */
