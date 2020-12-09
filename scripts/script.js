function updateScroll(){
    let screen = document.querySelector("#screen-text-container");
    screen.scrollLeft = screen.scrollWidth;
}

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
    display.textContent = a.concat(operatorSymbol, b);
    updateScroll();
    return;
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
        if (failDecimal(this.id, a) == 'failed') {
            return;
        }
        a = a.concat(this.id);
    }
        // if after operator, store as b
        else {
            if (failDecimal(this.id, b) == 'failed') {
                return;
            }
            b = b.concat(this.id);
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
        operator = this.id;
        operatorSymbol = this.dataset.symbol;
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
            operator = this.id;
            operatorSymbol = this.dataset.symbol;
            b = '';
            showDisplay();
        }
}));

// when person punches in equals sign
let equals = document.querySelector('#equals');
equals.addEventListener('click', function(e) {
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