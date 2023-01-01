document.querySelector("form").addEventListener("submit", (e)=> {
    e.preventDefault();
    readFields();
} );
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
function checkDubble (item) {
    for (const element of readLocalStorage('data')) {
        if (JSON.stringify(element) === JSON.stringify(item)) {
            return false;
        }
    }
    return true;
}
function readFields() {
    const id = document.getElementById("id").value;
    const price = document.getElementById("price").value;
    const name = document.getElementById("name").value;
    const noise = document.getElementById("noise-cancellation").value;
    const draag = document.getElementById("draag-comfort").value;
    const geluids = document.getElementById("geluids-kwaliteit").value;
    const url = document.getElementById("url").value;
    const specs = { "noise-cancellation": noise, "draag-comfort": draag, "geluids-kwaliteit": geluids };
    const inputs = { "id": id, "name": name, "specs": specs, "price": price, "url": url };
    if (checkDubble(inputs)) {
        let data = readLocalStorage("data");
        data.push(inputs);
        setLocalStorage("data",data);
        alert("You have successfully added headphone");
        window.location.replace("../admin.html");
    } else {
        alert("You have already this headphone in your database");
    }
}