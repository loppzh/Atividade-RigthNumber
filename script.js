let randomNumber = Math.floor(Math.random() * 10);
let score = 0;
let time = 30;
let interval = null;
let decrement = 1;

const timerElement = document.getElementById('timer');
const hintElement = document.getElementById('hint');
const displayElement = document.getElementById('display');
const messageElement = document.getElementById('message');
const numberPad = document.getElementById('number-pad');

function startTimer() {
    interval = setInterval(() => {
        if (time <= 0) {
            time = 0;
            updateTimer();
            clearInterval(interval);
            playSound('loss'); // toca som de derrota
            showMessage('⏳ Tempo esgotado! Você perdeu.');
            return;
        }
        time -= decrement;
        updateTimer();
    }, 1000);
}


function updateTimer() {
    timerElement.textContent = `00:${time < 10 ? '0' + time : time}`;
}

function guess(number) {
    if (!interval) startTimer();

    if (number === randomNumber) {
        score++;
        playSound('correct');
        hintElement.textContent = '✅ ACERTOU!';
        decrement = 1; // Volta ao ritmo normal
        if (score >= 3) {
            clearInterval(interval);
            playSound('win');
            showMessage('🎉 Você é o vencedor! 🎉');
        } else {
            nextRound();
        }
    } else {
        playSound('error');
        hintElement.textContent = number > randomNumber ? 'O NÚMERO É MENOR' : 'O NÚMERO É MAIOR';
        incrementDecrement(); // Acelera o timer
    }
}

function nextRound() {
    randomNumber = Math.floor(Math.random() * 10);
    displayElement.textContent = '?';
}

function incrementDecrement() {
    decrement++;
}

function playSound(type) {
    const correctSound = document.getElementById('sound-correct');
    const errorSound = document.getElementById('sound-error');
    const winSound = document.getElementById('sound-win');
    const lossSound = document.getElementById('sound-loss');

    if (type === 'correct') {
        correctSound.currentTime = 0;
        correctSound.play();
    } else if (type === 'error') {
        errorSound.currentTime = 0;
        errorSound.play();
    } else if (type === 'win') {
        winSound.currentTime = 0;
        winSound.play();
    } else if (type === 'loss') {
        lossSound.currentTime = 0;
        lossSound.play();
    }
}


function showMessage(text) {
    messageElement.querySelector('h2').textContent = text;
    messageElement.style.display = 'block';
    numberPad.style.display = 'none';
}

function resetGame() {
    randomNumber = Math.floor(Math.random() * 10);
    score = 0;
    time = 30;
    decrement = 1;
    clearInterval(interval);
    interval = null;
    updateTimer();
    hintElement.textContent = '';
    displayElement.textContent = '?';
    messageElement.style.display = 'none';
    numberPad.style.display = 'grid';
}

window.onload = resetGame;
