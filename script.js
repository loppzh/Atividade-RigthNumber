let randomNumber = Math.floor(Math.random() * 10);
let score = 0;
let time = 30;
let interval = null;

const timerElement = document.getElementById('timer');
const hintElement = document.getElementById('hint');
const displayElement = document.getElementById('display');

function startTimer() {
    interval = setInterval(() => {
        time--;
        updateTimer();
        if (time <= 0) {
            clearInterval(interval);
            alert('⏳ Tempo esgotado! Você perdeu.');
            resetGame();
        }
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
        if (score >= 3) {
            clearInterval(interval);
            alert('🎉 Vitória! Você acertou 3 vezes.');
            resetGame();
        } else {
            nextRound();
        }
    } else {
        playSound('error');
        hintElement.textContent = number > randomNumber ? 'O NÚMERO É MENOR' : 'O NÚMERO É MAIOR';
        // Aumentar velocidade do tempo
        accelerateTimer();
    }
}

function nextRound() {
    randomNumber = Math.floor(Math.random() * 10);
    displayElement.textContent = '?';
}

function accelerateTimer() {
    clearInterval(interval);
    interval = setInterval(() => {
        time -= 2; // Tempo corre mais rápido
        updateTimer();
        if (time <= 0) {
            clearInterval(interval);
            alert('⏳ Tempo esgotado! Você perdeu.');
            resetGame();
        }
    }, 1000);
}

function playSound(type) {
    const sound = new Audio(type === 'correct' 
        ? 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_5a6a5dc993.mp3?filename=success-1-6297.mp3' 
        : 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_57d7e0fa90.mp3?filename=error-1-6296.mp3');
    sound.play();
}

function resetGame() {
    randomNumber = Math.floor(Math.random() * 10);
    score = 0;
    time = 30;
    clearInterval(interval);
    interval = null;
    updateTimer();
    hintElement.textContent = '';
    displayElement.textContent = '?';
}

window.onload = resetGame;
