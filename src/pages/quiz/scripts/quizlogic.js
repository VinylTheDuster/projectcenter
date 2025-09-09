// variables
const btnStart = document.getElementById('quiz-start-btn');

const quizContainer = document.getElementById('quiz-container');
const quizPresentation = document.getElementById('quiz-presentation');

const quizResponded = [];

let points = 0;
let questionCounter = 0;

// functions

/// start & info

function initializeQuiz() {

    quizPresentation.hidden = true;
    quizContainer.style.display = 'inline';

    infoPreQuiz();
}

function infoPreQuiz() {

    quizContainer.innerHTML = "";

    let counter = 7;
    let intervalId = null;

    const quizCounter = document.createElement('span');
    const quizInfoDiv = document.createElement('div');
    const quizInfoP = document.createElement('p');

    quizInfoP.textContent = "Répondez dans le temps imparti aux questions. Chaque bonne réponse vous accorderas 1 points. Si vous sélectionnez la mauvaise réponse ou si vous n'en sélectionner pas durant le temps impartie, vous ne gagnerez aucun point.";
    quizCounter.textContent = "7";

    quizCounter.setAttribute('role', 'timer');

    quizInfoDiv.appendChild(quizInfoP);
    quizContainer.appendChild(quizCounter);
    quizContainer.appendChild(quizInfoDiv);

    intervalId = setInterval(() => {
        
        if(counter > 0) {

            counter--;
            quizCounter.textContent = `${counter}`;
        } else {

            clearInterval(intervalId);
            quizContainer.innerHTML = "";
            quizSetup();
        }

    }, 1000);
}

/// quiz & mechanics

async function quizSetup() {

    quizContainer.innerHTML = "";

    questionCounter++;

    const reponse = await fetch('./scripts/quizlist.json');
    const quizJSON = await reponse.json();

    const quizObject = getRandomQuizObject(quizJSON);

    let counter = 15;
    let intervalId = null;

    const questionTime = document.createElement('span');

    const questionContainer = document.createElement('div');
    const questionNumber = document.createElement('h1');
    const question = document.createElement('p');

    const choicesContainer = document.createElement('div');

    questionTime.textContent = counter;
    questionNumber.textContent = `Question n°${questionCounter}`;
    question.textContent = quizObject.question;

    // choices
    const choicesToShuffle = quizObject.choices;
    const choices = shuffleChoices(choicesToShuffle);

    choices.forEach((element) => {

        const choicesLabel = document.createElement('label');
        choicesLabel.setAttribute('name', 'choices');

        const choicesInput = document.createElement('input');
        choicesInput.setAttribute('type', 'radio');
        choicesInput.setAttribute('name', 'choices');
        choicesInput.setAttribute('value', element);

        choicesLabel.textContent = element;

        choicesContainer.appendChild(choicesLabel);
        choicesContainer.appendChild(choicesInput);
    });

    // validation btn
    const submitBtn = document.createElement('button');

    submitBtn.textContent = 'Valider la réponse';

    quizContainer.appendChild(questionContainer);
    quizContainer.appendChild(choicesContainer);
    questionContainer.appendChild(questionNumber);
    questionContainer.appendChild(questionTime);
    questionContainer.appendChild(question);
    quizContainer.appendChild(submitBtn);

    // event listener & actions
    submitBtn.addEventListener('click', () => {

        const inputSelected = document.querySelector("input[name='choices']:checked");

        if(inputSelected) {

            submitTreatment(quizObject, false, inputSelected);
        } else {

            alert("Vous devez sélectionner l'une des réponses !");
        }
        
    });

    intervalId = setInterval(() => {
        
        if(counter > 0) {

            counter--
            questionTime.textContent = `${counter}`;
        } else {

            clearInterval(intervalId);
            submitTreatment(quizObject, true);
        }

    }, 1000);
}

function submitTreatment(quizObject, bTimeOver, inputSelected) {


    if(bTimeOver == true || inputSelected.value == null) {
        return quizInterlude(false, true);
    }

    if(quizObject.answer == inputSelected.value) {
        quizInterlude(true, false);
        points++
    } else {
        quizInterlude(false, false);
    }
}

function quizInterlude(bool, bTimeOver) {

    quizContainer.innerHTML = "";

    const interludeContainer = document.createElement('div');

    const answeringMessage = document.createElement('h1');
    const interludeBtn = document.createElement('button');

    if(bool) {

        answeringMessage.textContent = "Bonne réponse !";
    } else if(!bool && bTimeOver == false) {

        answeringMessage.textContent = "Mauvaise réponse !";
    } else {

        answeringMessage.textContent = "Temps écoulée !";
    }

    if(questionCounter == 10) {

        interludeBtn.textContent = "Terminer";
        interludeBtn.addEventListener('click', () => quizEnded());
    } else {

        interludeBtn.textContent = "Continuer";
        interludeBtn.addEventListener('click', () => quizSetup());
    }

    quizContainer.appendChild(interludeContainer);
    interludeContainer.appendChild(answeringMessage);
    interludeContainer.appendChild(interludeBtn);
}

function quizEnded() {

    quizContainer.innerHTML = "";

    const scoreContainer = document.createElement('div');

    const playerScore = document.createElement('h1');
    const continueBtn = document.createElement('button');

    playerScore.textContent = `Votre score : ${points}/10`;
    continueBtn.textContent = "Relancer";

    quizContainer.appendChild(scoreContainer);
    scoreContainer.appendChild(playerScore);
    scoreContainer.appendChild(continueBtn);

    continueBtn.addEventListener('click', () => {

        points = 0;
        questionCounter = 0;

        infoPreQuiz();
    });
}

/// quiz fonctions

function getRandomQuizObject(jsonFile, callback) {

    const keys = Object.keys(jsonFile);

    let randomKey;
    
    do {
        randomKey = keys[Math.floor(Math.random() * keys.length)];
        console.log('boucle');
    } while (quizResponded.includes(randomKey));    

    quizResponded.push(randomKey);
    return jsonFile[randomKey];
}

// Fisher Yates shuffle //
function shuffleChoices(array) {

    const newArray = array.slice();

    for (let i = newArray.length - 1; i > 0; i--) {

        const j = Math.floor(Math.random() * (i + 1));

        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }

    return newArray;
}

// event listeners & actions

btnStart.addEventListener('click', () => initializeQuiz());