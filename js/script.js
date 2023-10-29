document.addEventListener('DOMContentLoaded', function() {
    const startBtn = document.getElementById('start-btn');
    const questionContainer = document.getElementById('question-container');
    const scoreContainer = document.getElementById('score-container');
    const questionText = document.getElementById('question-text');
    const choicesList = document.getElementById('choices-list');
    const choiceButtons = document.querySelectorAll('.choice-btn');
    const submitBtn = document.getElementById('submit-btn');
    const scoreText = document.getElementById('score');
    const initialsInput = document.getElementById('initials-input');
    const saveBtn = document.getElementById('save-btn');
    const timerDisplay = document.getElementById('timer');
    let score = 0;
    let currentQuestionIndex = 0;
    let timeLeft = 60;
    let timerInterval;

    const questions = [
        {
            question: 'What is the typeof operator in JavaScript? Note: Answer incorrectly and you lose 10 seconds on the timer!',
            choices: ['number', 'string', 'boolean', 'undefined'],
            answer: 'string',
        },
        {
            question: 'What is a closure in JavaScript?',
            choices: ['loop', 'variable', 'object', 'function'],
            answer: 'function',
        },
        {
            question: 'What tag do you use inside the header tag for the title of your website?',
            choices: ['h1 tag', 'body tag', 'p tag', 'div tag'],
            answer: 'h1 tag',
        },
    ];

    function displayQuestion(index) {
        if (index >= questions.length || timeLeft <= 0) {
            endQuiz();
            return;
        }
        const question = questions[index];
        questionText.textContent = question.question;
        for (let i = 0; i < choiceButtons.length; i++) {
            choiceButtons[i].textContent = question.choices[i];
        }
    }

    function checkAnswer() {
        const currentQuestion = questions[currentQuestionIndex];
        const selectedChoice = document.querySelector('.choice-btn.selected');
        if (selectedChoice) {
            const userAnswer = selectedChoice.textContent.trim().toLowerCase(); // Convert to lowercase and trim whitespace
            const correctAnswer = currentQuestion.answer.toLowerCase(); // Convert to lowercase
            if (userAnswer === correctAnswer) {
                score += 10;
                scoreText.textContent = score;
            } else {
                timeLeft -= 10;
            }
            currentQuestionIndex++;
            displayQuestion(currentQuestionIndex);
        }
    }

    function startQuiz() {
        startBtn.style.display = 'none';
        questionContainer.classList.remove('hide');
        timerInterval = setInterval(function() {
            if (timeLeft > 0) {
                timeLeft--;
                timerDisplay.textContent = `Time Left: ${timeLeft}`;
            } else {
                endQuiz();
            }
        }, 1000);
        displayQuestion(currentQuestionIndex);
        const headerTitle = document.getElementById('header-title');
        headerTitle.style.display = 'none'; // Hide the header title when clicking start quiz
    }

    function endQuiz() {
        clearInterval(timerInterval);
        questionContainer.classList.add('hide');
        scoreContainer.classList.remove('hide');
        timerDisplay.classList.add('hide');
    }

    startBtn.addEventListener('click', startQuiz);
    submitBtn.addEventListener('click', checkAnswer);
    saveBtn.addEventListener('click', function() {
        const initials = initialsInput.value.trim();
        // Code to save the score with initials goes here.
        console.log(`Score ${score} saved with initials ${initials}`);
        // Reset the game so the user can play again.
        location.reload();
    });

    // Adding event listener for choice buttons on quiz
    choicesList.addEventListener('click', function(e) {
        const selectedButton = e.target.closest('button');
        if (selectedButton) {
            for (let i = 0; i < choiceButtons.length; i++) {
                choiceButtons[i].classList.remove('selected');
            }
            selectedButton.classList.add('selected');
        }
    });

    // Adding an event listener so an indicator of which answer is selected is visible
    choicesList.addEventListener('click', function(e) {
        const selectedButton = e.target.closest('.choice-btn');
        if (selectedButton) {
            for (let i = 0; i < choiceButtons.length; i++) {
                if (choiceButtons[i] === selectedButton) {
                    choiceButtons[i].classList.add('selected');
                    choiceButtons[i].style.backgroundColor = 'lightblue'; // Change the background color for the selected choice
                } else {
                    choiceButtons[i].classList.remove('selected');
                    choiceButtons[i].style.backgroundColor = ''; // Reset the background color for other choices
                }
            }
        }
    });
});


