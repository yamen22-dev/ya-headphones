function readLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
}
function setLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}
function loadPage() {
    for (const item of readLocalStorage("orders")) {
        const el = `<tr class="table-primary">
                        <td>${item.id}</td>
                        <td>${item.name}</td>
                        <td>${item.time}</td>
                        <td>${item.date}</td>
                        <td>${item.amount}</td>
                    </tr>
                     `;
        document.querySelector("tbody").innerHTML+= el;
    }
}
loadPage();