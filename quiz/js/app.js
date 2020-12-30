
// ------------------------------------------ Start Variables -----------------------------------------------------
const questionNumber = document.querySelector(".question-number");

const questionText = document.querySelector(".question-text");

const optionContainer = document.querySelector(".option-container");

const answersIndicatorContainer = document.querySelector(".answers-indicator");

const homeBox = document.querySelector(".home-box");
const quizBox = document.querySelector(".quiz-box");
const resultBox = document.querySelector(".result-box");

let questionCounter = 0;
let attempts = 0;
let correctAnswers = 0;

let currentQuestion; // uninitialized, so it returns null

let availableQuestions = [];
let availableOptions = [];

function quizOver() {
   quizBox.classList.add("hide");
   homeBox.classList.add("hide");
   resultBox.classList.remove("hide");
   quizResult();
}

function quizResult() {
    resultBox.querySelector(".total-question").innerHTML = quiz.length;
    resultBox.querySelector(".total-attempt").innerHTML = attempts;
    resultBox.querySelector(".total-correct").innerHTML = correctAnswers;
    resultBox.querySelector(".total-wrong").innerHTML = attempts - correctAnswers;
    const percentage = (correctAnswers / quiz.length) * 100;
    resultBox.querySelector(".percentage").innerHTML = percentage.toFixed(2) + '%';
    resultBox.querySelector(".total-score").innerHTML = correctAnswers + " / " + quiz.length;
}

function setAvailableQuestions() {
    const totalQuestions = quiz.length;
    for (let i = 0; i < totalQuestions; i++) {
        availableQuestions.push(quiz[i])
    }
}

function updateAnswersIndicator(markType) {
    answersIndicatorContainer.children[questionCounter - 1].classList.add(markType);
}

function unclickableOptions() {
    const optionLen = optionContainer.children.length;

    for (let i = 0; i < optionLen; i++) {
        optionContainer.children[i].classList.add("already-answered");
    }
}

function getResult(element) {
    const id = parseInt(element.id);
    attempts++;
    if (id === currentQuestion.answer) {
        element.classList.add("correct");

        updateAnswersIndicator("correct");
        correctAnswers++;
    } else {
        element.classList.add("wrong");

        updateAnswersIndicator("wrong");

        const optionLen = optionContainer.children.length;

        for (let i = 0; i < optionLen; i++) {
            if (parseInt(optionContainer.children[i].id) === currentQuestion.answer) {
                optionContainer.children[i].classList.add("correct");
            }
        }
    }
    
    unclickableOptions();
}

function getNewQuestion() {
    questionNumber.innerHTML = "Question " + (questionCounter + 1) + " of " + quiz.length;

    let questionIndex = availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
    currentQuestion = questionIndex;

    const index1 = availableQuestions.indexOf(questionIndex);
    availableQuestions.splice(index1, 1);

    const optionLen = currentQuestion.options.length;

    let animationDelay = 0.15;

    optionContainer.innerHTML = '';

    for (let i = 0; i < optionLen; i++) {
        availableOptions.push(i);
    }

    for (let i = 0; i < optionLen; i++) {

        const optionIndex = availableOptions[Math.floor(Math.random() * availableOptions.length)];

        const index2 = availableOptions.indexOf(optionIndex);
        availableOptions.splice(index2, 1);

        const option = document.createElement("div");
        option.innerHTML = currentQuestion.options[optionIndex];
        option.id = optionIndex;
        option.style.animationDelay = animationDelay + 's';
        animationDelay = animationDelay + 0.15;
        option.className = "option";
        optionContainer.appendChild(option);
        option.setAttribute("onclick", "getResult(this)")
     }

    questionText.innerHTML = currentQuestion.question;
    questionCounter++;
}

function answersIndicator() {
    answersIndicatorContainer.innerHTML='';
    const totalQuestion = quiz.length;
    for (let i = 0; i < totalQuestion; i++) {
       const indicator = document.createElement("div");
       answersIndicatorContainer.appendChild(indicator);
    }
}

// ------------------------------------------ End Variables --------------------------------------------------------

// ------------------------------------------ IMPORTANT CODE (RESTRICTED ACCESS) -----------------------------------


function startQuiz() {
    homeBox.classList.add("hide");
    resultBox.classList.add("hide");
    quizBox.classList.remove("hide");
    setAvailableQuestions();
    getNewQuestion();
    answersIndicator();
}

function next() {
    if (questionCounter === quiz.length) {
        quizOver();
    } else {
        getNewQuestion()
    }
}

function resetQuiz() {
    questionCounter = 0;
    correctAnswers = 0;
    attempts = 0;
}

function home() {
    quizBox.classList.add("hide");
    resultBox.classList.add("hide");
    homeBox.classList.remove("hide");
    resetQuiz();
}

function tryAgainQuiz() {
    homeBox.classList.add("hide");
    resultBox.classList.add("hide");
    quizBox.classList.remove("hide");
    resetQuiz();
    startQuiz();
}

window.onload = function() {
    homeBox.querySelector(".total_question").innerHTML = quiz.length;
};
