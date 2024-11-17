let popup = document.querySelector(".popup");
let popupContent = document.querySelector(".popup-content");
let form = document.querySelector("#form");

function showPopup() {
    popup.style.display = "block";
    // document.body.style.overflowY = "hidden";
    window.history.pushState({popup: true}, "", "#popup");
}

function hidePopup() {
    popup.style.display = "none";
    // document.body.style.overflowY = "hidden";
    window.history.back();
}

function saveInLocalStorage() {
    let inputs = form.querySelectorAll("input");
    inputs.forEach(function (input) {
        localStorage.setItem(input.id, input.value);
    });
}

function sendForm(event) {
    event.preventDefault();

    saveInLocalStorage();
    console.log("Saved in Local storage");

    const formData = new FormData(form);
    const xhr = new XMLHttpRequest();

    xhr.open("POST", "https://formcarry.com/s/z1t_SvhAfIZ");

    xhr.setRequestHeader("Accept", "application/json");

    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            form.reset();
            if (xhr.status === 200) {
                document.getElementById("result").innerText =
                "Форма отправлена";
            } else {
                document.getElementById("result").innerText =
                "Ошибка: " + xhr.status;
            }
        }
    };

    xhr.send(formData);
}


window.addEventListener("DOMContentLoaded", function () {
    let inputs = form.querySelectorAll("input");
    inputs.forEach(function (input) {
        const storedValue = localStorage.getItem(input.id);

        if (storedValue) {
            console.log(input.id + " rescued from local storage");
            input.value = storedValue;
        }
    });

    let buttonOpenForm = document.querySelector("#open-form");
    buttonOpenForm.addEventListener("click", showPopup);

    let buttonCLoseForm = document.querySelector("#close-form");
    buttonCLoseForm.addEventListener("click", hidePopup);

    form.addEventListener("submit", sendForm);

    window.addEventListener("popstate", function () {
        if (this.window.location.hash.match(/^#popup$/)) {
            popup.style.display = "block";
        } else {
            popup.style.display = "none";
        }
    });

});