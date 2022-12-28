function checkWinkelwagen() {
    if (localStorage.getItem("winkelwagen") != null) {
        return true;
    }
    return false;
}
function readLocalStoarge(key) {
    return JSON.parse(localStorage.getItem(key));
}
function setLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}
function loadCartItems() {
    const parent = document.querySelector("main");
    parent.removeChild(document.querySelector("div.row"));
    for (const name of readLocalStoarge("winkelwagen")) {
        const item = getItem(name);
        const el = `
        <div class="container" id="besteling-container">
            <div class="row mt-4 text-center" id="id${item.id}">
                <div class="col-3 text-start">
                    <p class="product-info-text name">${item.name}</p>
                </div>
                <div class="col-3">
                    <h4 class="product-info-text" id="price${item.id}">€${item.price}</h4>
                </div>
                <div class="col-3" style="display: flex; justify-content: center; align-items: flex-start;">
                    <button id="minus${item.id}" style="border:none;background-color: transparent;">
                        <span class="material-icons text-primary pt-2">
                            remove_circle
                        </span>
                    </button>

                    <div class="mb-3">
                        <input readonly type="text" class="form-control text-center" id="aantal${item.id}" value="1">
                        <small class="form-text text-muted">Druk op pijljes om de aantal te
                            veranderen</small>
                    </div>
                    <button id="add${item.id}" style="border:none;background-color: transparent;">
                        <span class="material-icons text-primary pt-2">
                            add_circle
                        </span>
                    </button>
                </div>
                <div class="col-3">
                    <button id="delete${item.id}" class="btn btn-danger">Verwijderen</button>
                </div>
            </div>
        </div>`;
        parent.innerHTML += el;
    }
}

function ordersLocalStorage(id, name, amount) {
    const newDate = new Date();
    const time = newDate.toLocaleTimeString();
    const date = newDate.toLocaleDateString();
    const newOrder = { "id": id, "name": name, "time": time, "date": date, "amount": amount };
    const orders = readLocalStoarge("orders");
    if (orders === null) {
        const list = [newOrder];
        setLocalStorage("orders", list);

    } else {
        orders.push(newOrder);
        setLocalStorage("orders", orders);
    }
}
function cartConfirmation() {
    document.querySelector("#pay").addEventListener("click", () => {
        const input = document.querySelectorAll('input');
        for (let index = 0; index < input.length; index++) {
            const element = input[index];
            const id = element.parentElement.parentElement.querySelector("button").id.slice(5);
            const amount = element.value;
            const name = element.parentElement.parentElement.parentElement.querySelector("div > p.name").innerText;
            ordersLocalStorage(id, name, amount)
        }
        localStorage.removeItem("winkelwagen");
        document.body.querySelector("main").remove();
        document.body.innerHTML += `
        <div class="text-center"><h1 class="h1">Je bestelling is afgerond!</h1></div>`;
    });
}
function cartFill() {
    if (checkWinkelwagen()) {
        document.getElementById("cart").innerHTML = `
    <a class="nav-link" href="winkelwagen.html" id="cart">
                            <i class="bi bi-cart-fill"></i>
                        </a>`
    } else {
        console.log("there is no items in cart");
        document.getElementById("cart").innerHTML = `
    <a class="nav-link" href="winkelwagen.html" id="cart">
                            <i class="bi bi-cart"></i>
                        </a>`
    }
}
function getItem(name) {
    for (const item of readLocalStoarge("data")) {
        if (item.name === name) {
            return item;
        }
    }
}
function getItemId(id) {
    for (const item of readLocalStoarge("data")) {
        if (item.id === id) {
            return item;
        }
    }
}
function leegWinkelwagen() {
    document.body.querySelector("main").remove();
    document.body.innerHTML += `
                    <div class="text-center"><h1 class="h1">Je wineklwagen is leeg!</h1></div>`;
    localStorage.removeItem("winkelwagen");
}
function buttonsFunctions() {
    const buttons = document.querySelectorAll("button");
    for (const button of buttons) {
        button.addEventListener("click", (event) => {
            if (event.target.innerText === "Verwijderen") {
                const parent = event.target.parentElement.parentElement;
                let currentArray = readLocalStoarge("winkelwagen");
                currentArray.splice(currentArray.indexOf((getItem(parent.querySelector(".text-start").innerText).name)), 1);
                if (currentArray.length > 0) {
                    parent.remove();
                    setLocalStorage("winkelwagen", currentArray);
                } else {
                    leegWinkelwagen();
                }
            } else if (event.target.innerText === "add_circle") {
                event.target.parentElement.parentElement.querySelector("input").value = parseInt(event.target.parentElement.parentElement.querySelector("input").value) + 1;
                totalCaculate();
            } else if (event.target.innerText === "remove_circle") {
                if (parseInt(event.target.parentElement.parentElement.querySelector("input").value) > 1) {
                    event.target.parentElement.parentElement.querySelector("input").value = parseInt(event.target.parentElement.parentElement.querySelector("input").value) - 1
                } else {
                    const element = event.target.parentElement.parentElement.querySelector("input").parentElement.parentElement.parentElement;
                    const item = getItem(element.querySelector("div > p").innerText);
                    let currentArray = readLocalStoarge("winkelwagen");
                    currentArray.splice(currentArray.indexOf(item), 1);
                    if (currentArray.length > 0) {
                        element.remove();
                        setLocalStorage("winkelwagen", currentArray);
                    } else {
                        leegWinkelwagen();
                    }
                }
            }
        });
    }
}
function totalCaculate() {
    let total = 0;
    for (let index = 0; index < document.querySelectorAll("[id^='price']").length; index++) {
        const price = parseFloat(document.querySelectorAll("[id^='price']")[index].innerText.substring(1));
        const amount = parseFloat(document.querySelectorAll("input")[index].value);
        total += price * amount;
    }
    document.querySelector("#total").innerText = "€" + total.toFixed(2);
}
function loadPage() {
    document.querySelector("main").innerHTML += `
    <div class="container">
    <div class="row mt-4 text-center">
        <div class="col-3 text-start">
            <h4>Naam</h4>
        </div>
        <div class="col-3">
            <h4>Prijs per stuk</h4>
        </div>
        <div class="col-3">
            <h4>Aantal</h4>
        </div>
        <div class="col-3">
            <h4>Totaal prijs</h4>
        </div>
    </div>
    </div>`
    loadCartItems();
    document.querySelectorAll("#besteling-container")[document.querySelectorAll("#besteling-container").length - 1].innerHTML += `
    <hr>
    <div class="col-3 ms-auto text-center">
        <p id="total"></p>
    </div>
    <div class="col-2 ms-auto " style="padding-left: 13px !important; padding-bottom:15px;">
        <button id="pay" class="btn bg-primary text-light p-2">Afrekenen</button>
    </div>`;
}
if (checkWinkelwagen()) {
    loadPage();
    cartFill();
    cartConfirmation();
    buttonsFunctions();
    totalCaculate();
}