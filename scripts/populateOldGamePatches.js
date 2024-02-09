async function populate() {
    const requestURL = 'https://raw.githubusercontent.com/FAForever/patchnotes/master/data/oldgamepatches.json';
    const request = new Request(requestURL);

    const response = await fetch(request);
    const patches = await response.json();

    GamePatches(patches);
}

function GamePatches(obj) {
    const container = document.querySelector(".gameList");
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