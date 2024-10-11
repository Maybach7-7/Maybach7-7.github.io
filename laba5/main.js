function isPositiveIntegerNumber(input) {
    return input.match(/^[1-9]\d*$/) !== null;
}

function calculate(event) {
    event.preventDefault();

    let quant = document.getElementById("quantity").value;
    let productPr = parseInt(document.getElementById("products").value);
    let res = document.getElementById("result");


    if (!isPositiveIntegerNumber(quant)) {
        res.innerHTML = "Введите натуральное число!";
    } else {
        res.innerHTML = "Оплачено: " + parseInt(quant) * productPr + " рублей";
    }
}


window.addEventListener("DOMContentLoaded", function () {
    let b = document.getElementById("button");
    b.addEventListener("click", calculate);
});