document.querySelector("form").addEventListener("submit", (e) => {
    // 
    e.preventDefault();
    readFields();
});
const previewButton = document.getElementById("preview-button");
const previewPlace = document.getElementById("preview-place");
previewButton.addEventListener("click", () => {
    const url = document.getElementById("url").value;
    previewPlace.src = url;
});
function readLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
}
function setLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}
function checkDubble(item) {
    for (const element of readLocalStorage('data')) {
        if (JSON.stringify(element) === JSON.stringify(item)) {
            return false;
        }
    }
    return true;
}
function readFields() {
    const inputId = document.getElementById("id").value;
    const inputPrice = document.getElementById("price").value;
    const inputName = document.getElementById("name").value;
    const inputNoise = document.getElementById("noise-cancellation").value;
    const inputDraag = document.getElementById("draag-comfort").value;
    const inputGeluids = document.getElementById("geluids-kwaliteit").value;
    const inputUrl = document.getElementById("url").value;
    const inputSpecs = { "noise-cancellation": inputNoise, "draag-comfort": inputDraag, "geluids-kwaliteit": inputGeluids };
    const inputs = { id: inputId, name: inputName, specs: inputSpecs, price: inputPrice, url: inputUrl };
    if (checkDubble(inputs)) {
        let data = readLocalStorage("data");
        data.push(inputs);
        setLocalStorage("data", data);
        alert("You have successfully added headphone");
        window.location.replace("../admin.html");
    } else {
        alert("You have already this headphone in your database");
    }
}