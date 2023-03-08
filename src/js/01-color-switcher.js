const INTERVAL_DELAY = 1000; 
let intervalId = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};

const body = document.body;
const buttonStart = document.querySelector('button[data-start]');
const buttonStop = document.querySelector('button[data-stop]');

buttonStart.addEventListener('click', onButtonStartClick); 
buttonStop.addEventListener('click', onButtonStopClick);

function onButtonStartClick() {

    intervalId = setInterval(() => {
        body.style.backgroundColor = getRandomHexColor();
    }, INTERVAL_DELAY);
    buttonStart.disabled = true;
};

function onButtonStopClick() {
    clearInterval(intervalId);
    buttonStart.disabled = false;
};
