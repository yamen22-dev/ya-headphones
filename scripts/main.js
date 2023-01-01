if (localStorage.getItem("data") == null) {
    /**
     * this checks if the json file readed or not. This is important to know if their is information in the website
     */
    fetch("../scripts/data.js")
        .then((response) => response.json())
        .then(data => {
            localStorage.setItem("data", JSON.stringify(data));
        })
}
function readLocalStoarge(key) {
    return JSON.parse(localStorage.getItem(key));
}
function setLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}
function setInfoIntoCards(aantalProducten) {
    const cards = document.querySelector("#cards");
    const data = readLocalStoarge("data");
    for (let index = 0; index < aantalProducten; index++) {
        const el =
            `<div class="col-1 col-md-4">
            <div class="card text-center">
                <img class="card-img-top" src="images/koptelefoon-${index + 1}.jpg" alt="zwarte koptelefoon   ">
                    <div class="card-body">
                        <h4 class="card-title">${data[index].name}</h4>
                        <p class="card-text">Noise-cancellation: ${data[index].specs["noise-cancellation"]}</p>
                        <p class="card-text">Geluidskwaliteit: ${data[index].specs["geluids-kwaliteit"]}</p>
                        <p class="card-text">Draagcomfort volgens klanten: ${data[index].specs["draag-comfort"]}</p>
                        <p class="card-text mt-4 price">Prijs: €${data[index].price}</p>
                        <div class="btn btn-primary text-light ps-2 pe-2" id="voeg-toe-winkelwagen-knop">Voeg toe
                            aan winkelwagen</div>
                    </div>
            </div>
        </div>`;

        cards.innerHTML += el;
    }
}
function addToCartButtons() {
    const buttons = document.querySelectorAll("#voeg-toe-winkelwagen-knop");
    for (const button of buttons) {
        button.addEventListener("click", () => {
            const title = button.parentElement.querySelectorAll(".card-title")[0].innerText;
            if (localStorage.getItem("winkelwagen") != null) {
                for (const name of readLocalStoarge("winkelwagen")) {
                    if (name == title) {
                        return false;
                    }
                }
                let cart = readLocalStoarge("winkelwagen");
                cart.push(title)
                setLocalStorage("winkelwagen", cart);
            } else {
                const newArray = [title];
                setLocalStorage("winkelwagen", newArray);
            }
        });
    }
}
function main() {
    // amount of cards that you want to fill.
    setInfoIntoCards(3);
    // make addToCart button works.
    addToCartButtons();
    cartFill();
}
function cartFill() {
    for (const button of document.querySelectorAll("#voeg-toe-winkelwagen-knop")) {
        button.addEventListener("click", () => {
            if (checkWinkelwagen()) {
                document.getElementById("cart").innerHTML = `
        <a class="nav-link" href="winkelwagen.html" id="cart">
                                <i class="bi bi-cart-fill"></i>
                            </a>`
            } else {
                document.getElementById("cart").innerHTML = `
        <a class="nav-link" href="winkelwagen.html" id="cart">
                                <i class="bi bi-cart"></i>
                            </a>`
            }
        })
    };

}
function checkWinkelwagen() {
    if (localStorage.getItem("winkelwagen") != null) {
        return true;
    }
    return false;
}
main();