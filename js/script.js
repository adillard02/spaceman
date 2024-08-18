const alphabetLtrs = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const inputBoxes = document.querySelector('.input-boxes');
const playAgainBtn = document.querySelector('.play-again-button');
const endGameBtn = document.querySelector('.end-game-button');
const hint = document.querySelector('.hint');
const guessesLeft = document.querySelector('.guesses-left');
let message = document.querySelector('.message');
const usedLetters = document.querySelector('.used-boxes');
const keyboard = document.getElementById('keyboard');
let img = document.querySelector('.spaceship');
let guessLtrArr = [];
let score = 0;
let word = '';
let maxGuesses = 5;
let scoreSaved = false;
const username = localStorage.getItem('username');

let timer;
let timeLeft = 30;
let timerDisplay = document.querySelector('.timer');

function createKeyboard() {
    keyboard.innerHTML = '';
    alphabetLtrs.forEach(letter => {
        const button = document.createElement('button');
        button.className = 'button ltr';
        button.textContent = letter;
        button.addEventListener('click', () => handleLetterClick(letter));
        keyboard.appendChild(button);
    });
}

function startTimer() {
    timeLeft = 30;
    timerDisplay.innerText = `Time Left: ${timeLeft}s`;
    timer = setInterval(() => {
        timeLeft--;
        timerDisplay.innerText = `Time Left: ${timeLeft}s`;
        if (timeLeft <= 0) {
            clearInterval(timer);
            gameOver();
        }
    }, 1000);
}

async function playGame() {
    scoreSaved = false;
    img.src = 'assets/images/rocket1.jpg';
    createKeyboard();
    startTimer();

    try {
        const response = await fetch('/api/words');
        const data = await response.json();
        if (data.success) {
            if (data.words.length === 0) {
                message.innerText = 'No words available.';
                return;
            }
            const randIndex = Math.floor(Math.random() * data.words.length);
            const randWordHint = data.words[randIndex];
            word = randWordHint.word;
            maxGuesses = 5;
            guessLtrArr = [];
            usedLetters.innerText = 'Used Letters: ';

            inputBoxes.innerHTML = '';
            for (let i = 0; i < word.length; i++) {
                const input = document.createElement('input');
                input.type = 'text';
                input.value = '';
                input.disabled = true;
                inputBoxes.appendChild(input);
            }

            hint.innerText = 'Hint: ' + randWordHint.hint;
            guessesLeft.innerHTML = 'Guesses Left: ' + maxGuesses;
            message.innerText = 'Correctly select the letters to launch the rocket.';
            updateScoreDisplay();
        } else {
            message.innerText = 'Failed to load words.';
        }
    } catch (error) {
        console.error('Error loading words:', error);
    }
}

function handleLetterClick(letter) {
    console.log(`Letter clicked: ${letter}`);
    if (word.includes(letter)) {
        if (!guessLtrArr.includes(letter)) {
            for (let i = 0; i < word.length; i++) {
                if (word[i] === letter) {
                    const inputBox = inputBoxes.querySelectorAll('input')[i];
                    inputBox.value = letter;
                    inputBox.classList.add('guessed');
                    message.innerText = 'Letter Correct!';
                    guessLtrArr.push(letter);
                    score = Math.max(score + 10, 0);
                    updateScoreDisplay();
                    if (word.length === guessLtrArr.length) {
                        message.innerText = 'Good Job! Preparing next word.';
                        disableKeyboard();
                        clearInterval(timer);
                        img.src = 'assets/images/rocket2.gif';
                        setTimeout(playGame, 6500);
                    }
                }
            }
        } else {
            message.innerText = 'You already guessed that letter!';
        }
    } else {
        if (!guessLtrArr.includes(letter)) {
            maxGuesses--;
            guessesLeft.innerText = 'Guesses Left: ' + maxGuesses;
            message.innerText = 'Oops! Wrong Letter.';
            score = Math.max(score - 10, 0);
            updateScoreDisplay();

            if (maxGuesses <= 0) {
                gameOver();
            }
        } else {
            message.innerText = 'You already guessed that letter!';
        }
    }

    if (alphabetLtrs.includes(letter)) {
        usedLetters.innerText += letter + ', ';
    }
}

function updateScoreDisplay() {
    document.getElementById('score').innerText = 'Score: ' + score;
}

function gameOver() {
    message.innerText = 'Game Over!';
    disableKeyboard();
    img.src = 'assets/images/rocket3.gif';
    if (!scoreSaved) {
        saveScore(username, score);
        scoreSaved = true;
    }
    clearInterval(timer);
    setTimeout(() => {
        window.location.href = 'home.html';
    }, 3500);
}

function saveScore(username, score) {
    fetch('/api/save-score', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, score }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            console.log('Score saved successfully with ID:', data.insertedId);
            fetchHighScores();
        } else {
            console.error('Failed to save score:', data.error);
        }
    })
    .catch(error => {
        console.error('Error saving score:', error);
    });
}

function fetchHighScores() {
    fetch('/api/high-scores')
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                const highScoresList = document.getElementById('high-scores-list');
                highScoresList.innerHTML = '';
                data.highScores.forEach(score => {
                    const li = document.createElement('li');
                    li.textContent = `${score.username}: ${score.score}`;
                    highScoresList.appendChild(li);
                });
            } else {
                console.error('Failed to load high scores:', data.error);
            }
        })
        .catch(error => {
            console.error('Error loading high scores:', error);
        });
}

function disableKeyboard() {
    const buttons = keyboard.querySelectorAll('button');
    buttons.forEach(button => button.disabled = true);
}

endGameBtn.addEventListener('click', () => {
    if (!scoreSaved) {
        saveScore(username, score);
        scoreSaved = true;
    }
    window.location.href = 'home.html';
});

playAgainBtn.addEventListener('click', playGame);

playGame();