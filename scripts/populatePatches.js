async function populate() {
    const requestURL = '../assets/data/patches.json';
    const request = new Request(requestURL);

    const response = await fetch(request);
    const patches = await response.json();

    BalancePatch(patches);
    GamePatches(patches);
}


function BalancePatch(obj) {
    const container = document.querySelector(".BalanceJSONList");
    const list = document.createElement("ul");

    const patches = obj.balance;

    for (const patch in patches) {
        const listitem = document.createElement("li");
        const link = document.createElement("a");
        const date = document.createElement("span");
        
        link.textContent = patches[patch].patch;
        link.href = patches[patch].link;

        date.textContent = patches[patch].date;

        listitem.appendChild(link);
        listitem.appendChild(date);
        list.appendChild(listitem);
    }
    container.appendChild(list);
}

function GamePatches(obj) {
    const container = document.querySelector(".GameJSONList");
    const list = document.createElement("ul");

    const patches = obj.game;

    for (const patch in patches) {
        const listitem = document.createElement("li");
        const link = document.createElement("a");
        const date = document.createElement("span");
        
        link.textContent = patches[patch].patch;
        link.href = patches[patch].link;

        date.textContent = patches[patch].date;

        listitem.appendChild(link);
        listitem.appendChild(date);
        list.appendChild(listitem);
    }
    container.appendChild(list);
}

populate();