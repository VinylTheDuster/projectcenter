
// => variables

const cardContainer = document.getElementById('card-container');

//addCard
const cardBtnSubmit = document.getElementById('addCard-submit');

//add/deleteCat
const catBtnSubmit = document.getElementById('addCat-submit');
const delCatBtnSubmit = document.getElementById('delCat-submit');

let currentCategory = [];

// => functions

class cardTemplate {

    constructor(id, title, category, description, priority, done = false, date = new Date()) {

        this.id = id;
        this.title = title;
        this.category = category;
        this.description = description;
        this.priority = priority;
        this.done = done;
        this.date = date;
    }
}

function getContentFromLocalStorage() { 
    
    let _localStorageArr = []; 
    
    for (let i = 0; i < localStorage.length; i++) { 
        
        let key = localStorage.key(i); 
        let value = localStorage.getItem(key); 
        
        _localStorageArr.push( key, value );
    } 
    
    return _localStorageArr; 
}

function getCategoryFromLocalStorage() {

}

function createNewCard(title, category, description, priority) {
    
    if (!category) {
        
        return alert('Le champ "Catégorie" est vide !');
    }

    if (!priority) {

        return alert('Veuillez choisir une priorité !');
    }

    return new cardTemplate(title, category, description, priority);
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

    const delCatTitle = document.getElementById('delCat-title').value;

    if (delCatTitle) {
        currentCategory.pop(delCatTitle);
        return initializeCategoryFields();
    }

    return alert('Impossible de supprimer cette catégorie.');
}

function initializeCategoryFields() {
    
    const categorySelect = document.querySelectorAll('.option-category');

    categorySelect.forEach((x) => {
        x.innerHTML = ``
        x.innerHTML += `<option value="">--Choisissez une catégorie--</option>`

        if (currentCategory && currentCategory.length > 0) {
            for (let i = 0; i < currentCategory.length; i++) {

                x.innerHTML += `
                <option value="${currentCategory[i]}"}>${currentCategory[i]}</option>`
            }
        }
    });
}

initializeCategoryFields();

// => actions & eventListeners

console.log(getContentFromLocalStorage());

cardBtnSubmit.addEventListener('click', () => { 

    const cardTitle = document.getElementById('addCard-title').value;
    const cardDesc = document.getElementById('addCard-desc').value;
    const cardCategory = document.getElementById('addCard-category').value;
    const cardPriority = document.getElementById('addCard-priority').value;

    createNewCard(cardTitle, cardCategory, cardDesc, cardPriority) 
});

catBtnSubmit.addEventListener('click', () => addNewCategory());
delCatBtnSubmit.addEventListener('click', () => deleteCategory());