async function populate() {
    const requestURL = '../assets/data/patches.json';

    try {
        const response = await fetch(requestURL);

        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }

        const patches = await response.json();

        renderPatchList(patches.balance, ".BalanceJSONList");
        renderPatchList(patches.game, ".GameJSONList");
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}

function renderPatchList(patchList, containerSelector) {
    const container = document.querySelector(containerSelector);

    if (!container) {
        console.error(`Container with selector ${containerSelector} not found`);
        return;
    }

    const list = document.createElement("ul");

    patchList.forEach(({ patch, link, date}) => {
        const listItem = document.createElement("li");

        const linkElement = document.createElement("a");
        linkElement.textContent = patch;
        linkElement.href = link;

        const dateElement = document.createElement("span");
        dateElement.textContent = date;

        listItem.append(linkElement, dateElement);
        list.appendChild(listItem);
    });

    container.appendChild(list);
}

populate();