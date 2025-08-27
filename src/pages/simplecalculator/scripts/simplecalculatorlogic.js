const btnNumbers = document.getElementsByClassName('sc-nbs');
const btnOperators = document.getElementsByClassName('sc-op');

const operationText = document.getElementById('sc-op-cont');
const answerText = document.getElementById('sc-answer');

const btnDelete = document.getElementById('sc-op-delete');

const btnCalculate = document.getElementById('sc-calculate');

//initialize all buttons (IMPORTANT)
function initializeButtons() {

    // set number buttons
    for (let i = 0; i < btnNumbers.length; i++) {
        btnNumbers[i].addEventListener('click', 
            () => addNumberToOperation(btnNumbers[i].textContent)
        );
    };

    // set operator buttons
    for (let i = 0; i < btnOperators.length; i++) {
        btnOperators[i].addEventListener('click', 
            () => addNumberToOperation(btnOperators[i].textContent)
        );
    };

    // set delete button
    btnDelete.addEventListener('click',
        () => deleteLastNumberToOperation()
    );

    btnCalculate.addEventListener('click', 
        () => calculateOperationContainer()
    );
}

initializeButtons();

//// calcul functions :

let operationContainer = [];
const operatorContainer = ['+', '-', 'x', '/'];

function addNumberToOperation(value) {
    
    let lastEntry = operationContainer.at(-1);

    // check si operatorContainer inclus la dernière valeur ajouter (si oui, ne rien faire) OU check si operatorContainer inclus la valeur qu'on souhaite ajouter
    if(!operatorContainer.includes(lastEntry) || !operatorContainer.includes(value)) {

        operationContainer.push(value);

        resetOperationContainer();
    }
}

function deleteLastNumberToOperation() {

    operationContainer.pop();

    resetOperationContainer();
}

function resetOperationContainer() {

    operationText.textContent = operationContainer.join('');
    console.log('refreshed');
}

function calculateOperationContainer() {

    let operationString = operationContainer.toString();

    if (operationString.includes('x')) {
        operationString = operationString.replaceAll('x', '*');
    }

    operationString = operationString.replaceAll(',', ' ');
    // attention : n'accepte que les chiffres, il faut supprimer les espaces pour faire des nombres sinon erreur

    result = eval(operationString);

    answerText.textContent = result;
    operationString = null;

    operationContainer = [];
    operationText.textContent = '';
}