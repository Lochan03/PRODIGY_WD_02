let startTime;
let updatedTime;
let difference;
let tInterval;
let running = false;
let lapCounter = 0;
const display = document.getElementById('display');
const startStopButton = document.getElementById('startStop');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapsList = document.getElementById('lapsList');

startStopButton.addEventListener('click', startStop);
resetButton.addEventListener('click', reset);
lapButton.addEventListener('click', recordLap);

function startStop() {
    if (!running) {
        startTime = new Date().getTime() - difference;
        tInterval = setInterval(updateTime, 1);
        running = true;
        startStopButton.textContent = 'Pause';
    } else {
        clearInterval(tInterval);
        running = false;
        startStopButton.textContent = 'Start';
    }
}
function reset() {
    clearInterval(tInterval);
    running = false;
    difference = 0;
    display.textContent = '00:00:00';
    startStopButton.textContent = 'Start';
    lapsList.innerHTML = '';
    lapCounter = 0;
}
function updateTime() {
    updatedTime = new Date().getTime() - startTime;
    difference = updatedTime;

    let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);

    hours = (hours < 10) ? '0' + hours : hours;
    minutes = (minutes < 10) ? '0' + minutes : minutes;
    seconds = (seconds < 10) ? '0' + seconds : seconds;

    display.textContent = hours + ':' + minutes + ':' + seconds;
}
function recordLap() {
    if (running) {
        lapCounter++;
        const lapTime = document.createElement('li');
        lapTime.textContent = `Lap ${lapCounter}: ${display.textContent}`;
        lapsList.appendChild(lapTime);
    }
}