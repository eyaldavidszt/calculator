function add(a, b) {
	return a + b;
}

function subtract(a, b) {
	return a - b;
}

function multiply(a, b) {
  return a * b;
}

function power(a, b) {
	return a**b;
}

function divide (a, b) {
    let x = a / b;
    return Math.floor(x * 100) / 100;
}


function operate(op, a, b) {
    a = parseFloat(a);
    b = parseFloat(b);
    if (op == "+")
    {
        return add(a, b);
    }
    if (op == "-")
    {
        return subtract(a, b);
    }
    if (op =="/")
    {
        if (divide(a, b) != Infinity)
        {
            return divide(a, b);
        }
        else {
            alert("can't divide by 0 =)");
            return "";
        } 
    }
    if (op =="*")
    {
        return multiply(a, b);
    }
}

//first. let's add event listener for each button. 
// it will fill up the display box accordingly.

let display = document.querySelector('.display-box');

let clear = document.querySelector('.clear');
clear.setAttribute('tabindex', '-1');

let undo = document.querySelector('.undo');

let buttons = document.querySelectorAll('button');


// add class digit to any digit
for (let button of buttons)
{
    button.setAttribute('tabindex', '-1');
    if (parseInt(button.textContent) || button.textContent === "0")
    {
        button.classList.add("digit");
    }

}




let digits = document.querySelectorAll('.digit');
for (let digit of digits) {
    digit.addEventListener('click', function addDigit() {
        display.value += parseInt(digit.textContent);
    });
}

function clearDisplay() {  
    display.value = '';
    array = [];
}
clear.addEventListener('click', clearDisplay);

function makeUndo () {
    array = display.value.split(' ');    
    if (array.length > 0)
    {
        if (!parseInt(array[array.length - 1]))
        {
            display.value = display.value.substring(0, display.value.length - 3);
        }
        else {
            display.value = display.value.substring(0, display.value.length - 1);
        }
    }
}
undo.addEventListener('click', makeUndo);



//when = : i need to parse string in text box. 
// stop when seeing * or / to operate (operators surrounded by spaces mby)
// then stop when seeing + or - to operate

//arr.splice to replace is important. i-- after

//NOW THE HARD PART. THE OPERATORS AND POINT(AND EQUALS)

//separate array items by spaces...
let array = [];
let isOperator = false;

let plus = document.querySelector('.plus');
function addPlus() {
    array = display.value.split(' ');
    //ok. + was clicked. + can't come unless there's a number before it.
    if (parseFloat(array[array.length - 1]) || parseFloat(array[array.length - 1]) === 0)
        {
            //we can add plus. let's check if there's operator in the display box.
            if (array[1])
            {
                isOperator = true;
            }
            else 
            {
                isOperator = false; 
            }

            if (isOperator) {
                let result = operate(array[1], array[0], array[2]);
                display.value = result;
            } 
            display.value += " + ";

        }
}
plus.addEventListener('click', addPlus);

let minus = document.querySelector('.minus');
function addMinus() {
    array = display.value.split(' ');
    if (parseFloat(array[array.length - 1]) || parseFloat(array[array.length - 1]) === 0)
        {
            if (array[1])
            {
                isOperator = true;
            }
            else 
            {
                isOperator = false; 
            }

            if (isOperator) {
                let result = operate(array[1], array[0], array[2]);
                display.value = result;
            } 

            display.value += " - ";

        }
}
minus.addEventListener('click', addMinus);

let multiplication  = document.querySelector('.multiplication');
function addMultiplication () {
    array = display.value.split(' ');
    console.log(array.length);
    console.log(array);    

    //ok. * was clicked. can't come at start, can't come after another operator. needs to come after a number.
    if (parseFloat(array[array.length - 1]) || parseFloat(array[array.length - 1]) === 0)
        {
            if (array[1])
            {
                isOperator = true;
            }
            else 
            {
                isOperator = false; 
            }

            if (isOperator) {
                let result = operate(array[1], array[0], array[2]);
                display.value = result;
            } 

            display.value += " * ";
        }
}

multiplication.addEventListener('click', addMultiplication);

let division = document.querySelector('.division');
function addDivision () {
    array = display.value.split(' ');
    console.log(array.length);
    console.log(array);    
        if (parseFloat(array[array.length - 1]) || parseFloat(array[array.length - 1]) === 0)
        {
            if (array[1])
            {
                isOperator = true;
            }
            else 
            {
                isOperator = false; 
            }

            if (isOperator) {
                let result = operate(array[1], array[0], array[2]);
                display.value = result;
            } 

            display.value += " / ";
        }
}

division.addEventListener('click', addDivision);

let sign = document.querySelector('.sign');
sign.addEventListener('click', () => {
    let num = 0;
    array = display.value.split(' ');
    console.log(array.length);
    console.log(array);    
        if (parseFloat(array[array.length - 1]) || parseFloat(array[array.length - 1]) === 0)
        {
            num = Number(array[array.length - 1]);
            num = num * -1;
            array[array.length - 1] = num;
            display.value = array.join(' ');
        }
        else if (array[array.length - 1] != "-" && array[array.length - 1] != ".")
        {
            display.value += "-";
        }
});
let percent = document.querySelector('.percent');

function addPercent() {
    let num = 0;
    array = display.value.split(' ');
    if (parseFloat(array[array.length - 1]) || parseFloat(array[array.length - 1]) === 0)
    {
        num = Number(array[array.length - 1]);
        num = operate("/", num, 100);
        array[array.length - 1] = num;
        display.value = array.join(' ');
    }
}

percent.addEventListener('click', addPercent);

let point = document.querySelector('.point');
function addPoint() {
    array = display.value.split(' ');
    if (!array[array.length - 1].includes('.'))
    {
        display.value += '.';
    }

}
point.addEventListener('click', addPoint);


//"Another difference is the result of "    " and "" where in both cases Number will give 0 but parseFloat gives NaN."

//NOW TO THE EQUALS SIGN.

equals = document.querySelector('.equals');
equals.addEventListener('click', calculate);

function calculate() {
    array = display.value.split(' ');
    if (array.length == 3) {
        if (array[2] != "") {
            let result = operate(array[1], array[0], array[2]);
            display.value = result;
        }
    }
}

//add kb support:


document.addEventListener('keydown', (event) => {
    console.log(event.key);
    if (event.key == '+')
    {
        addPlus();
    }
    if(event.key == '-')
    {
        if (display.value == '')
        {
            display.value += '-';
        }
        addMinus();
    }
    if(event.key == '*')
    {
        addMultiplication();
    }
    if (event.key == '/')
    {
        addDivision();
    }
    if (event.key == '.')
    {
        addPoint();
    }
    if (parseFloat(event.key) || parseFloat(event.key) === 0) {
        display.value += event.key;
    }
    if (event.key == '=' || event.key == 'Enter')
    {
        calculate();
    }
    if (event.key == 'Backspace')
    {
        makeUndo();
    }
    if (event.key == '%')
    {
        addPercent();
    }
    if (event.code == 'KeyC')
    {
        clearDisplay();
    }
});











