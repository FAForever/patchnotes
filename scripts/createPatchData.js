// Function to generate HTML for intro
function generateIntroHTML(patch) {
    return `
        <div id="Intro">
            <header class="FlexBoxContainer">
                <h1 class="FlexGrow4">Patch ${patch.Patch.number}</h1>
                <h4 class="FlexGrow1">Date:<i> ${patch.Patch.date}</i></h4>
            </header>
            <p>${patch.Patch.description}</p>
            <h3>-- ${patch.Patch.team}</h3>
            <hr>
        </div>
    `;
}

// Function to generate HTML for each unit
function generateUnitHTML(unit) {
    let html = `<div id="${unit.Name.toLowerCase()}" class="Card">`;
    html += `<h3><img src="${unit.Img}"> ${unit.Name}</h3>`;
    if (unit.Description) {
        html += `<p>${unit.Description}</p>`;
    }
    html += '<ul>';
    unit.Changes.forEach(function(change) {
        if (change.Change && change.Change.length === 2) {
            html += `<li>${change.Field}: <s>${change.Change[0]}</s> <i class="fa-solid fa-arrow-right"></i> ${change.Change[1]}</li>`;
        } else {
            html += `<li>${change.Field}</li>`;
        }
    });
    html += '</ul>';
    html += '</div>';
    return html;
}

// Function to generate HTML for sidebar
function generateSidebarHTML(units) {
    let sidebarHTML = '';
    units.forEach(unit => {
        sidebarHTML += `<a href="#${unit.Name.toLowerCase()}"><img src="${unit.Img}"></a>`;
    });
    return sidebarHTML;
}

// Function to generate HTML for each category
function generateCategoryHTML(category, categoryName) {
    let categoryHTML = '';
    const categoryID = categoryName === 'Patch' ? 'Patch' : categoryName.replace(/\s+/g, '-').toLowerCase();
    categoryHTML += `<div id="${categoryID}">`;
    const categoryHeading = categoryName === 'Patch' ? '' : `<h2>${categoryName}</h2>`;
    categoryHTML += `${categoryHeading}<div class="Units">`;
    if (category.Units && category.Units.length > 0) {
        categoryHTML += category.Units.map(unit => generateUnitHTML(unit)).join('');
    }
    categoryHTML += '</div>'; // Close Units div
    categoryHTML += '</div>'; // Close Category div
    return categoryHTML;
}

// Function to fetch JSON data from server
async function fetchJSONData(filename) {
    try {
        const response = await fetch(filename);
        return await response.json();
    } catch (error) {
        console.error('Error fetching JSON data:', error);
        return null;
    }
}

// Function to process JSON data and generate HTML
async function processJSONFile(filename) {
    try {
        const data = await fetchJSONData(filename);
        if (!data) {
            throw new Error('Failed to load JSON data.');
        }
        const patchNumber = Object.keys(data)[0];
        const patch = data[patchNumber];
        const categories = ['Land', 'Air', 'Navy', 'Acus', 'Structure'];

        // Generate HTML for intro
        const introHTML = generateIntroHTML(patch);
        
        // Generate HTML for all categories
        const allCategoryHTML = categories.map(categoryName => generateCategoryHTML(patch[categoryName], categoryName)).join('');
        
        // Update main content area
        document.querySelector('.Content').innerHTML = introHTML + allCategoryHTML;

        // Collect all units from all categories for sidebar
        const allUnits = categories.flatMap(categoryName => patch[categoryName].flatMap(subCategory => subCategory.Units));
        
        // Generate sidebar HTML
        const sidebarHTML = generateSidebarHTML(allUnits);
        
        // Update sidebar
        document.querySelector('.IconSidebarSubgrid').innerHTML = sidebarHTML;
    } catch (error) {
        console.error(error.message);
    }
}

// File URL to fetch JSON from
const jsonFileURL = '/assets/data/balancePatches.json';

// Process JSON file
processJSONFile(jsonFileURL);
