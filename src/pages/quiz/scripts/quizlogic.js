//imports
import quizJSON from "./quizlist" assert { type: 'json'};

const btnStart = document.getElementById('quiz-start-btn');

const quizContainer = document.getElementById('quiz-container');
const quizPresentation = document.getElementById('quiz-presentation');

// functions

/// start & info

function initializeQuiz() {

    quizPresentation.hidden = true;
    quizContainer.style.display = 'inline';

    infoPreQuiz();
}

function infoPreQuiz() {

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

            counter--
            quizCounter.textContent = `${counter}`;
        } else {

            clearInterval(intervalId);
            quizContainer.innerHTML = "";
            quizSetup();
        }

    }, 1000);
}

/// quiz & mechanics

function quizSetup() {

}

// event listeners & actions

btnStart.addEventListener('click', () => initializeQuiz());