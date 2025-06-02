window.onload = function() {

let a = '';
let b = '';
let expressionResult = '';
let selectedOperation = null;

// окно вывода результата
outputElement = document.getElementById("result");

// список объектов кнопок циферблата (id которых начинается с btn_digit_)
digitButtons = document.querySelectorAll('[id ^= "btn_digit_"]');

function onDigitButtonClicked(digit) {
    const maxLength = 16; // Максимальная длина строки

    if (!selectedOperation) {
        if (a.length >= maxLength) return;

        if (digit === '.' && (a === '' || a.includes('.'))) return;

        a += digit;
        outputElement.innerHTML = a;
    } else {
        if (b.length >= maxLength) return;

        if (digit === '.' && (b === '' || b.includes('.'))) return;

        b += digit;
        outputElement.innerHTML = b;
    }
}


// устанавка колбек-функций на кнопки циферблата по событию нажатия
digitButtons.forEach(button => {
    button.onclick = function() {
        const digitValue = button.innerHTML;
        onDigitButtonClicked(digitValue);
    };
});

// установка колбек-функций для кнопок операций
document.getElementById("btn_op_mult").onclick = function() {
    if (a === '') return;
    selectedOperation = 'x';
};
document.getElementById("btn_op_plus").onclick = function() {
    if (a === '') return;
    selectedOperation = '+';
};
document.getElementById("btn_op_minus").onclick = function() {
    if (a === '') return;
    selectedOperation = '-';
};
document.getElementById("btn_op_div").onclick = function() {
    if (a === '') return;
    selectedOperation = '/';
};

// кнопка процента
document.getElementById("btn_op_percent").onclick = function() {
    if (!selectedOperation) {
        a = (parseFloat(a) / 100).toString();
        outputElement.innerHTML = a;
    } else {
        b = (parseFloat(b) / 100).toString();
        outputElement.innerHTML = b;
    }
};

// кнопка смены знака
document.getElementById("btn_op_sign").onclick = function() {
    if (!selectedOperation) {
        a = (-parseFloat(a)).toString();
        outputElement.innerHTML = a;
    } else {
        b = (-parseFloat(b)).toString();
        outputElement.innerHTML = b;
    }
};

// кнопка очищения
document.getElementById("btn_op_clear").onclick = function() {
    a = '';
    b = '';
    selectedOperation = '';
    expressionResult = '';
    outputElement.innerHTML = 0;
};

// кнопка расчёта результата
document.getElementById("btn_op_equal").onclick = function() {
    if (a === '' || b === '' || !selectedOperation)
        return;

    switch(selectedOperation) {
        case 'x':
            expressionResult = (+a) * (+b);
            break;
        case '+':
            expressionResult = (+a) + (+b);
            break;
        case '-':
            expressionResult = (+a) - (+b);
            break;
        case '/':
            expressionResult = (+a) / (+b);
            break;
    }

    a = expressionResult.toString();
    b = '';
    selectedOperation = null;

    outputElement.innerHTML = a;
}

// Функции перевода чисел в различные системы счисления
function convertNumber(base) {
    if (a === '') return;
    let number = parseInt(a, 10); //преобразуем строку в десятичное
    outputElement.innerHTML = number.toString(base).toUpperCase(); //кейс заглавные, нумертустринг это перевести число в нужную систему
}

document.getElementById("btn_bin").onclick = function() { convertNumber(2); };
document.getElementById("btn_dec").onclick = function() { convertNumber(10); };
document.getElementById("btn_hex").onclick = function() { convertNumber(16); };
document.getElementById("btn_oct").onclick = function() { convertNumber(8); };

};