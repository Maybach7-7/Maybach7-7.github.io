function isPositiveIntegerNumber(input) {
    return input.match(/^[1-9]\d*$/) !== null;
}

function calculateProduct(event) {
    event.preventDefault();

    let quant = document.getElementById("quantity-product");
    let productPr = parseInt(document.getElementById("products").value);
    let res = document.getElementById("result-product");

    if (!isPositiveIntegerNumber(quant.value)) {
        res.innerHTML = "Введите натуральное число!";
        quant.value = "";
    } else {
        let amount = parseInt(quant.value);
        res.innerHTML = "Оплачено: " + amount * productPr + " рублей";
    }
}


function calculateService(event) {
    event.preventDefault();
    let res = document.getElementById("result-service");

    let selector = "#services input[type=radio]:checked";
    let selectedService = document.querySelector(selector);
    if (selectedService === null) {
        res.innerHTML = "Выберите необходимую услугу!";
    } else {
        let quant = document.getElementById("quantity-service");
        if (!isPositiveIntegerNumber(quant.value)) {
            res.innerHTML = "Введите натуральное число!";
            quant.value = "";
        } else {
            let currentService = json_statham[parseInt(selectedService.value)];
            let servicePrice = 0;
            if (currentService.options) {
                let optionPrice = document.getElementById(currentService.name);
                servicePrice += parseInt(optionPrice.value);
            }
            if (currentService.properties) {
                selector = "#properties input[type=checkbox]:checked";
                let selectedProperties = document.querySelectorAll(selector);
                selectedProperties.forEach(function (item) {
                    servicePrice += parseInt(item.value);
                });
            }

            let amount = parseInt(quant.value);
            res.innerHTML = "Сумма услуг: " + servicePrice * amount;
        }
    }

}


const json_statham = [
    {
        "name": "roast",
        "options": [
            {
                "add-price": 100,
                "name": "rare",
                "text": "Rare"
            },
            {
                "add-price": 100,
                "name": "medium",
                "text": "Medium"
            },
            {
                "add-price": 100,
                "name": "well done",
                "text": "Well done"
            }
        ],
        "text": "Тип прожарки"
    },
    {
        "name": "add-to-coffee",
        "properties": [
            {
                "add-price": 15,
                "name": "milk",
                "text": "Сливки"
            },
            {
                "add-price": 5,
                "name": "cinnamon",
                "text": "Корица"
            },
            {
                "add-price": 0,
                "name": "sugar",
                "text": "Сахар"
            },
            {
                "add-price": 15,
                "name": "syrup",
                "text": "Сироп"
            }
        ],
        "text": "Добавки для кофе"
    },
    {
        "name": "no-service",
        "text": ""
    }
];

function insertOptions(serviceNumber) {
    let options = document.getElementById("options");
    options.innerHTML = "";     // clear options div

    let service = json_statham[serviceNumber];
    if (service.options && service.options.length > 0) {
        let selectLabel = document.createElement("label");
        selectLabel.innerText = service.text;
        selectLabel.for = service.name;

        let sel = document.createElement("select");
        sel.id = service.name;
        sel.name = "service-options";
        sel.style = `padding:10px; margin:10px`;

        service.options.forEach(function (option) {
            let newOption = document.createElement("option");
            newOption.name = option.name;
            newOption.value = option["add-price"];
            newOption.text = `${option.text} - ${option["add-price"]} рублей`;

            sel.appendChild(newOption);
        });
        options.appendChild(selectLabel);
        options.appendChild(sel);
    }
}

function insertProperties(serviceNumber) {
    let properties = document.getElementById("properties");
    properties.innerHTML = "";

    let service = json_statham[serviceNumber];
    if (service.properties && service.properties.length > 0) {
        let selectLabel = document.createElement("label");
        selectLabel.innerText = service.text;
        selectLabel.for = service.name;

        service.properties.forEach(function (p) {
            let newProperty = document.createElement("input");
            newProperty.type = "checkbox";
            newProperty.value = p["add-price"];
            newProperty.id = p.name;

            let pLabel = document.createElement("label");
            pLabel.htmlFor = p.name;
            pLabel.innerText = `${p.text} - ${p["add-price"]} рублей`;

            properties.appendChild(newProperty);
            properties.appendChild(pLabel);
        });
    }
}

function chooseService(event) {
    document.getElementById("result-service").innerText = "";
    let serviceNumber = parseInt(event.target.value);
    insertOptions(serviceNumber);
    insertProperties(serviceNumber);
}

window.addEventListener("DOMContentLoaded", function () {
    let buttonProduct = document.getElementById("button-product");
    buttonProduct.addEventListener("click", calculateProduct);

    let serviceContainer = document.getElementById("services");
    serviceContainer.addEventListener("change", chooseService);

    let buttonService = document.getElementById("button-service");
    buttonService.addEventListener("click", calculateService);
});
