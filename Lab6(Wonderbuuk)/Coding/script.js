const questions = [
    {
        question: "What does HTML stand for?",
        options: [
            "Hyper Text Markup Language",
            "Home Tool Markup Language",
            "Hyperlinks and Text Markup Language",
            "Hyper Tool Multi Language"
        ],
        correctAnswer: 0
    },
    {
        question: "Which CSS property is used to change the text color of an element?",
        options: [
            "font-color",
            "text-color",
            "color",
            "background-color"
        ],
        correctAnswer: 2
    },
    {
        question: "Inside which HTML element do we put the JavaScript?",
        options: [
            "<js>",
            "<javascript>",
            "<script>",
            "<scripting>"
        ],
        correctAnswer: 2
    },
    {
        question: "How do you create a function in JavaScript?",
        options: [
            "function myFunction()",
            "function:myFunction()",
            "function = myFunction()",
            "create myFunction()"
        ],
        correctAnswer: 0
    }
];

let currentQuestionIndex = 0;
let score = 0;
let timerInterval;
let timeLeft = 15;
let selectedOptionIndex = null;
let shuffledQuestions = [];
const TIME_LIMIT = 15;

const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const timerDisplay = document.getElementById("timer");
const feedbackContainer = document.getElementById("feedback-container");
const feedbackText = document.getElementById("feedback-text");
const submitBtn = document.getElementById("submit-btn");
const nextBtn = document.getElementById("next-btn");
const quizSection = document.getElementById("quiz-section");
const resultSection = document.getElementById("result-section");
const scoreDisplay = document.getElementById("score-display");
const totalQuestionsDisplay = document.getElementById("total-questions");

function shuffleQuestions() {
    shuffledQuestions = [...questions];
    for (let i = shuffledQuestions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledQuestions[i], shuffledQuestions[j]] = [shuffledQuestions[j], shuffledQuestions[i]];
    }
}

function startTimer() {
    timeLeft = TIME_LIMIT;
    timerDisplay.textContent = timeLeft;
    
    clearInterval(timerInterval); 

    timerInterval = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            checkAnswer(true); 
        }
    }, 1000);
}

function displayQuestion() {
    selectedOptionIndex = null;
    feedbackContainer.classList.add("hidden");
    submitBtn.classList.remove("hidden");
    nextBtn.classList.add("hidden");
    
    const currentQuestion = shuffledQuestions[currentQuestionIndex];
    
    questionText.textContent = currentQuestion.question;
    optionsContainer.innerHTML = ""; 

    currentQuestion.options.forEach((option, index) => {
        const btn = document.createElement("button");
        btn.textContent = option;
        btn.classList.add("option-btn");
        btn.onclick = () => selectOption(index, btn);
        optionsContainer.appendChild(btn);
    });

    startTimer();
}

function selectOption(index, btnElement) {
    if (submitBtn.classList.contains("hidden")) return; 

    const allButtons = document.querySelectorAll(".option-btn");
    allButtons.forEach(btn => btn.classList.remove("selected"));

    selectedOptionIndex = index;
    btnElement.classList.add("selected");
}

function checkAnswer(timeUp = false) {
    clearInterval(timerInterval);

    if (timeUp && selectedOptionIndex === null) {
        handleIncorrect();
        return;
    }

    if (selectedOptionIndex === null) {
        alert("Please select an option first!");
        startTimer();
        return;
    }

    const currentQuestion = shuffledQuestions[currentQuestionIndex];
    
    const allButtons = document.querySelectorAll(".option-btn");
    allButtons.forEach(btn => {
        btn.style.pointerEvents = "none"; 
    });

    if (selectedOptionIndex === currentQuestion.correctAnswer) {
        score++;
        feedbackText.textContent = "Correct!";
        feedbackText.className = "correct-text";
        allButtons[currentQuestion.correctAnswer].classList.add("correct");
        allButtons[currentQuestion.correctAnswer].classList.remove("selected");
    } else {
        handleIncorrect();
        allButtons[currentQuestion.correctAnswer].classList.add("correct");
    }

    feedbackContainer.classList.remove("hidden");
    submitBtn.classList.add("hidden");
    nextBtn.classList.remove("hidden");
}

function handleIncorrect() {
    const currentQuestion = shuffledQuestions[currentQuestionIndex];
    const allButtons = document.querySelectorAll(".option-btn");

    feedbackText.textContent = "Incorrect or Time's Up!";
    feedbackText.className = "incorrect-text";
    
    if (selectedOptionIndex !== null) {
        allButtons[selectedOptionIndex].classList.add("incorrect");
        allButtons[selectedOptionIndex].classList.remove("selected");
    }
    
    allButtons[currentQuestion.correctAnswer].classList.add("correct");

    allButtons.forEach(btn => btn.style.pointerEvents = "none");

    feedbackContainer.classList.remove("hidden");
    submitBtn.classList.add("hidden");
    nextBtn.classList.remove("hidden");
}


function nextQuestion() {
    currentQuestionIndex++;
    
    if (currentQuestionIndex < shuffledQuestions.length) {
        displayQuestion();
    } else {
        endQuiz();
    }
}

function startQuiz() {
    shuffleQuestions();
    currentQuestionIndex = 0;
    score = 0;
    totalQuestionsDisplay.textContent = questions.length;
    quizSection.classList.remove("hidden");
    resultSection.classList.add("hidden");
    displayQuestion();
}

function endQuiz() {
    quizSection.classList.add("hidden");
    resultSection.classList.remove("hidden");
    scoreDisplay.textContent = score;
}

window.onload = startQuiz;