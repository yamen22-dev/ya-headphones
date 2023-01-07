// check if there is data localStorage
if (localStorage.getItem("data") === null) {
    readJson();
} else {
    // load the page
    main();
}
function readLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
}
function setLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}
function loadPage() {
    // load the page with js info
    document.getElementById("row").innerHTML = "";
    for (const item of readLocalStorage("data")) {
        document.getElementById("row").innerHTML +=
            `<tr>
            <td>${item.id}</td>
            <td>${item.name}</td>
            <td>${item.specs['noise-cancellation']}</td>
            <td>${item.specs['draag-comfort']}</td>
            <td>${item.specs['geluids-kwaliteit']}</td>
            <td>€${item.price}</td>
            <td>${item.url}</td> 
            <td><button type="button" class="btn btn-primary btn-md" id="edit">
                    Edit
                </button></td>
            <td><!-- Button trigger modal -->
                <button type="button" class="btn btn-danger btn-md" data-bs-toggle="modal" data-bs-target="#id${item.id}">
                    Verwijderen
                </button>
                
                <!-- Modal -->
                <div class="modal fade" id="id${item.id}" tabindex="-1" role="dialog" aria-labelledby="TitleId${item.id}" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                                <div class="modal-header">
                                        <h5 class="modal-title" id="TitleId${item.id}">Waarschuwing verwijderen product uit admin-panel</h5>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                            <div class="modal-body">
                                <div class="container-fluid">
                                    Weet je zeker dat je gaat dit verwijderen
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" class="btn btn-danger" data-bs-dismiss="modal" id="del${item.id}">Verwijderen</button>
                            </div>
                        </div>
                    </div>
                </div>
            </td>
        </tr>`;
    }
}
function getItemId(id) {
    // get element through id
    for (const item of readLocalStorage("data")) {
        if (item.id === id) {
            return item;
        }
    }
    return false;
}
function removeFromLocalStorage(id) {
    // delete item from the localstorage
    let data = readLocalStorage("data");
    for (let index = 0; index < data.length; index++) {
        const element = data[index];
        if (element.id === id) {
            data.splice(index, 1);
            setLocalStorage("data", data);
        }
    }
}
function deleteButton() {
    // set function to delete button in the table
    for (const button of document.querySelectorAll("[id^='del']")) {
        button.addEventListener("click", () => {
            const parent = button.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;
            const id = parent.querySelector(":first-child td").innerText;
            removeFromLocalStorage(id);
            parent.remove();
            main();
        });
    }
}
async function readJson() {
    // read json file and set the new info
    const response = await fetch('scripts/data.js');
    const result = await response.json();
    setLocalStorage('data', result);
    main();
}
function main() {
    // the first function to run in this script
    loadPage();
    deleteButton();
}
function getItemtByID(id) {
    // it return false if the item not found.
    for (const item of readLocalStorage("data")) if (item.id === id) return item;
    return false;
}

function editPage(event) {
    // this function will delete everything in the edit page. Then make it for edit page.
    // get item
    const id = event.target.parentElement.parentElement.querySelector(":first-child").innerText;
    const item = getItemtByID(id);
    // reset page
    document.querySelector("main").innerHTML = "";

    // load edit page
    loadEditPage(id);
    // opslaan gewijzigde gegevens 
    saveChanges(item);
}
function loadEditPage(id) {
    // load editpage 
    for (const item of readLocalStorage("data")) {
        if (item.id === id) {
            document.querySelector("main").innerHTML +=
                `
            <div class="mb-3">
                <label for="id" class="form-label">ID</label>
                <input id="id" type="text" class="form-control bg-dark text-light" value="${item.id}">
            </div>
            <div class="mb-3">
                <label for="name" class="form-label">Name</label>
                <input id="name" type="text" class="form-control bg-dark text-light" value="${item.name}">
            </div>
            <div class="mb-3">
                <label for="noise-cancellation" class="form-label">Noise-cancellation</label>
                <input id="noise-cancellation" type="text" class="form-control bg-dark text-light" value="${item.specs['noise-cancellation']}">
            </div>
            <div class="mb-3">
                <label for="draag-comfort" class="form-label">Draag-comfort</label>
                <input id="draag-comfort" type="text" class="form-control bg-dark text-light" value="${item.specs['draag-comfort']}">
            </div>
            <div class="mb-3">
                <label for="draag-comfort" class="form-label">Geluids-kwaliteit</label>
                <input id="geluids-kwaliteit" type="text" class="form-control bg-dark text-light" value="${item.specs['geluids-kwaliteit']}">
            </div>
            <div class="mb-3">
                <label for="price" class="form-label">Price</label>
                <input id="price" type="text" class="form-control bg-dark text-light" value="${item.price}">
            </div>
            <div class="mb-3">
                <label for="url" class="form-label">${item.url}</label>
                <input id="url" type="text" class="form-control bg-dark text-light" value="${item.url}">
            </div>
            <div class="mb-3">
                <button class="btn btn-primary btn-lg">Bevestigen</button>
            </div>
            `;
        }
    }
}

function showSuccessAlert () {
    // this will show when edit item is succussfully
    const oldHTML = document.querySelector("main").innerHTML; 
    const alert = `<div class="alert alert-success" role="alert">
            <h2>The new information is saved !!!</h2>
        </div>`;
    const newHTML = alert + oldHTML;
    document.querySelector("main").innerHTML = newHTML;
}
function readFields() {
    // read input fields
    const fields = document.querySelectorAll("input");
    const id = fields[0].value;
    const name = fields[1].value;
    const noise = fields[2].value;
    const draag = fields[3].value;
    const sound = fields[4].value;
    const price = fields[5].value;
    const url = fields[6].value;
    const inputsValue = { "id": id, "name": name, "specs": { "noise-cancellation": noise, "draag-comfort": draag, "geluids-kwaliteit": sound }, "price": price, "url": url };
    return inputsValue;
}
function saveChanges(oldItem) {
    // save changes you made on item
    const button = document.querySelectorAll("button")[1];
    button.addEventListener("click", () => {
        const value = readFields();
        let data = readLocalStorage("data");
        for (let index = 0; index < data.length; index++) {
            if (JSON.stringify(oldItem) === JSON.stringify(data[index])) {
                data[index] = value;
            }
        }
        setLocalStorage("data",data);
        showSuccessAlert();
        setTimeout(() => {
            window.location.replace("admin.html");
        }, 2000);
    });
}
// readJSon button giving fucntion
document.querySelector("#read-json-button").addEventListener("click", readJson);
// edit buttons get worked.
for (const button of document.querySelectorAll("#edit")) button.addEventListener("click", (event) => editPage(event));