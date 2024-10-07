const questions = [
    {
        question: "What is the capital of France?",
        options: ["Paris", "London", "Berlin", "Madrid"],
        answer: 0
    },
    {
        question: "What is 2 + 2?",
        options: ["3", "4", "5", "6"],
        answer: 1
    },
    {
        question: "What is the largest planet in our solar system?",
        options: ["Earth", "Mars", "Jupiter", "Saturn"],
        answer: 2
    },
    {
        question: "Who wrote 'Hamlet'?",
        options: ["Charles Dickens", "William Shakespeare", "Mark Twain", "Ernest Hemingway"],
        answer: 1
    },
    {
        question: "What is the boiling point of water?",
        options: ["100°C", "90°C", "80°C", "110°C"],
        answer: 0
    }
];

let currentQuestionIndex = 0;
let score = 0;
let timerInterval;
const totalQuestions = questions.length;

const quizElement = document.getElementById('quiz');
const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const resultElement = document.getElementById('result');
const scoreElement = document.getElementById('score');
const timeElement = document.getElementById('time');
const restartButton = document.getElementById('restartButton');

if (localStorage.getItem('currentQuestionIndex')) {
    currentQuestionIndex = parseInt(localStorage.getItem('currentQuestionIndex'));
}
if (localStorage.getItem('score')) {
    score = parseInt(localStorage.getItem('score'));
}

function startQuiz() {
    quizElement.classList.remove('hidden');
    resultElement.classList.add('hidden');
    showQuestion();
}

function showQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    optionsElement.innerHTML = '';

    currentQuestion.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.textContent = option;
        button.onclick = () => selectAnswer(index);
        optionsElement.appendChild(button);
    });

    resetTimer();
}

function selectAnswer(selectedIndex) {
    const correctIndex = questions[currentQuestionIndex].answer;
    if (selectedIndex === correctIndex) {
        score++;
        alert('Right Answer')
    }
    currentQuestionIndex++;

    // Save progress to localStorage
    localStorage.setItem('currentQuestionIndex', currentQuestionIndex);
    localStorage.setItem('score', score);

    if (currentQuestionIndex < totalQuestions) {
        showQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    quizElement.classList.add('hidden');
    resultElement.classList.remove('hidden');
    scoreElement.textContent = score;
    localStorage.removeItem('currentQuestionIndex');
    localStorage.removeItem('score');
}

function resetTimer() {
    clearInterval(timerInterval);
    timeElement.textContent = 10;

    timerInterval = setInterval(() => {
        let timeLeft = parseInt(timeElement.textContent);
        if (timeLeft > 0) {
            timeElement.textContent = timeLeft - 1;
        } else {
            clearInterval(timerInterval);
            // Automatically move to the next question
            currentQuestionIndex++;
            localStorage.setItem('currentQuestionIndex', currentQuestionIndex);
            if (currentQuestionIndex < totalQuestions) {
                showQuestion();
            } else {
                showResult();
            }
        }
    }, 1000);
}

restartButton.addEventListener('click', () => {
    currentQuestionIndex = 0;
    score = 0;
    localStorage.removeItem('currentQuestionIndex');
    localStorage.removeItem('score');
    startQuiz();
});

startQuiz();
