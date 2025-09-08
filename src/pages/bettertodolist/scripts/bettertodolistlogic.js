// => variables

const cardContainer = document.getElementById('card-container');

//add/delCard
const cardBtnSubmit = document.getElementById('addCard-submit');

//add/deleteCat/Card
const catBtnSubmit = document.getElementById('addCat-submit');
const delCatBtnSubmit = document.getElementById('delCat-submit');
const delCardBtnSubmit = document.getElementById('delCard-submit');

let currentCardData = getContentFromLocalStorage();
let currentCategory = [];

// => classes & functions

/// classes

class cardTemplate {

    constructor(id = 0, title, category, description, priority, done = false, date = new Date()) {

        this.id = id;
        this.title = title;
        this.category = category;
        this.description = description;
        this.priority = priority;
        this.done = done;
        this.date = date;
    }
}

/// localStorage manipulations

function getContentFromLocalStorage() {

    let data = {};

    for (let i = 0; i < localStorage.length; i++) {

        let key = localStorage.key(i);
        let value = localStorage.getItem(key);

        data[key] = value;
    }
    
    return data;
}

function getCategoryFromLocalStorage() {

    for (let i = 0; i < localStorage.length; i++) {

        let storedData = localStorage.getItem(i);

        if (!storedData) continue;

        let inputedCategory = JSON.parse(storedData).category;

        if (!currentCategory.includes(inputedCategory)) {
            currentCategory.push(JSON.parse(storedData).category);
        }
    }
}

function updateLocalStorage() {
    for (let i = 0; i < Object.keys(currentCardData).length; i++) {

        let key = i;        
        let value = JSON.stringify(currentCardData[key]);
        localStorage.setItem(key, value);
    }

    console.log(localStorage);
    initializeCardContainer();
}

function reorganizeLocalStorage() {

    let newLocalStorage = [];

    for (let i = 0; i < localStorage.length; i++) {

        let key = localStorage.key(i);
        let value = localStorage.getItem(key);

        if (value !== null) {

            newLocalStorage.push(value);
        }
    }

    localStorage.clear();

    if (newLocalStorage.length > 0) {

        newLocalStorage.forEach((value, i) => {

            let parsedValue = JSON.parse(value);
            parsedValue.id = i;

            let newValue = JSON.stringify(parsedValue);
            localStorage.setItem(i, newValue);
        });
    }

    getContentFromLocalStorage();
    initializeCardContainer();
}

/// cards creation and initialization

function createNewCard(title, category, description, priority) {

    let id = (Object.keys(currentCardData).length === 0 ? 0 : Object.keys(currentCardData).length);
    
    if (!category) {
        
        return alert('Le champ "Catégorie" est vide !');
    }

    if (!priority) {

        return alert('Veuillez choisir une priorité !');
    }

    let newCard = new cardTemplate(id, title, category, description, priority);

    return addCardToVariables(newCard);
}

function addCardToVariables(cardToAdd) {

    let dataKey = cardToAdd.id;
    
    currentCardData[dataKey] = cardToAdd;
    updateLocalStorage();
}

// categories manipulation functions

function addNewCategory() {

    const catTitle = document.getElementById('addCat-title');

    if (!currentCategory.includes(catTitle.value.trim())) {
        
        currentCategory.push(catTitle.value.trim());
        catTitle.value = '';
        return initializeCategoryFields();
    }

    return alert('Vous ne pouvez pas ajoutez une catégorie existante !');
}

function deleteCategory() {

    const delCatTitle = document.getElementById('delCat-title');

    console.log(delCatTitle.value);

    let isDeletable = () => {

        if (localStorage.length == 0) {
            return true;
        } else {

            for (let i = 0; i < localStorage.length; i++) {
        
                let category = JSON.parse(currentCardData[i]).category;

                if (category == delCatTitle.value) {
                    console.log('false');
                    return false;
                }
            }
        }

        return true;
    }

    if (delCatTitle.value != "none" && isDeletable()) {
        currentCategory.pop(delCatTitle.value);
        return initializeCategoryFields();
    }

    return alert('Impossible de supprimer cette catégorie.');
}

function initializeCategoryFields() {
    
    const categorySelect = document.querySelectorAll('.option-category');

    getCategoryFromLocalStorage();

    categorySelect.forEach((x) => {

        x.innerHTML = `<option value="none">--Choisissez une catégorie--</option>`

        if (currentCategory && currentCategory.length > 0) {

            console.log(currentCategory);

            for (let i = 0; i < currentCategory.length; i++) {

                x.innerHTML += `
                <option value="${currentCategory[i]}"}>${currentCategory[i]}</option>`
            }
        }
    });
}

// card rendering

function initializeCardContainer() {

    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = "";

    let dataFromStorage = getContentFromLocalStorage();

    let hasLooped = false;

    for (key in dataFromStorage) {

        let rawData = dataFromStorage[key];
        let data = typeof rawData === "string" ? JSON.parse(rawData) : rawData;

        console.log('ça boucle');
        cardContainer.innerHTML += `
        <div id="${'card' + data.id}" class="card-item">
            <h3>${data.title}</h3>
            <span id="${'span' + data.id}" class="delCard">╳</span>
            <div class="card-info">
                <div class="card-info-labels">
                    <h4>Catégorie :</h4><p>${data.category}</p>
                    <h4>Prioritée :</h4><p>${data.priority}</p>
                </div>
                <div class="card-info-description">
                    <h4>Description :</h4>
                    <p>${data.description}</p>
                </div>
            </div>
            <div class="card-btn-done">
                <button>Clôturer la tâche</button>
            </div>
            <div class="card-info-date">
                <p>${data.date}</p>
            </div>
        </div>`;

        hasLooped = true;

        // initialize events listeners for deleting card with the span X
        let currentSpan = document.getElementById('span' + data.id);

        currentSpan.addEventListener('click', function () {

            localStorage.removeItem(key);
            this.parentNode.remove();
            
            reorganizeLocalStorage();
        });
    }
    
    if (!hasLooped) {
        cardContainer.innerHTML = ``;
        console.log('hasntloop');
    }

    initializeCategoryFields();
}

// options

function deleteAllCard() {

    if(Object.keys(currentCardData).length !== 0) {

        if (confirm('Êtes-vous sûr de vouloir supprimer toutes les cartes ? Vous ne pourrez plus les restaurées après coup.')) {
            localStorage.clear();
            currentCategory = [];
    
            initializeCardContainer();
            initializeCategoryFields();
        }
    } else {
        alert('Aucune carte à supprimée détectée.')
    }
}

// => actions & eventListeners

initializeCategoryFields();
initializeCardContainer();

console.log(getContentFromLocalStorage());

cardBtnSubmit.addEventListener('click', () => { 

    const cardTitle = document.getElementById('addCard-title').value;
    const cardDesc = document.getElementById('addCard-desc').value;
    const cardCategory = document.getElementById('addCard-category');
    const cardPriority = document.getElementById('addCard-priority');

    let cardCatText = cardCategory.options[cardCategory.selectedIndex].textContent;
    let cardPriText = cardPriority.options[cardPriority.selectedIndex].textContent;

    createNewCard(cardTitle, cardCatText, cardDesc, cardPriText); 
});

catBtnSubmit.addEventListener('click', () => addNewCategory());
delCatBtnSubmit.addEventListener('click', () => deleteCategory());
delCardBtnSubmit.addEventListener('click', () => deleteAllCard());