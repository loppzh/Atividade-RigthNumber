let randomNumber = Math.floor(Math.random() * 10);
let score = 0;
let time = 30;
let interval = null;
let decrement = 1; // Velocidade do tempo

const timerElement = document.getElementById('timer');
const hintElement = document.getElementById('hint');
const displayElement = document.getElementById('display');
const messageElement = document.getElementById('message');
const numberPad = document.getElementById('number-pad');

function startTimer() {
    interval = setInterval(() => {
        time -= decrement;
        updateTimer();
        if (time <= 0) {
            clearInterval(interval);
            showMessage('⏳ Tempo esgotado! Você perdeu.');
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
        decrement = 1; // Volta ao normal

        if (score >= 3) {
            clearInterval(interval);
            showMessage('🎉 Você é o vencedor! 🎉');
        } else {
            nextRound();
        }
    } else {
        playSound('error');
        hintElement.textContent = number > randomNumber ? 'O NÚMERO É MENOR' : 'O NÚMERO É MAIOR';
        accelerateTimer();
    }
}

function nextRound() {
    randomNumber = Math.floor(Math.random() * 10);
    displayElement.textContent = '?';
}

function accelerateTimer() {
    decrement = 2; // Acelera o tempo
}

function playSound(type) {
    const sound = new Audio(type === 'correct' 
        ? 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_5a6a5dc993.mp3?filename=success-1-6297.mp3' 
        : 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_57d7e0fa90.mp3?filename=error-1-6296.mp3');
    sound.play();
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
