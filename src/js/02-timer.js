// Import 
import flatpickr from "flatpickr";
import { convertMs } from './convertMs';
import { Notify } from 'notiflix/build/notiflix-notify-aio';


//Import css styles
import "flatpickr/dist/flatpickr.min.css";


const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      console.log(selectedDates[0]);
      chooseDate(selectedDates[0]);
  },
};

const inputDateTimePicker = document.querySelector('#datetime-picker');
const btnStart = document.querySelector('[data-start]');
const days = document.querySelector('[data-days]');
const hours = document.querySelector('[data-hours]');
const minutes = document.querySelector('[data-minutes]');
const seconds = document.querySelector('[data-seconds]');

const INTERVAL_DILEY = 1000;
let intervalId = null; 
let timerTime = 0;
let formatDate = null;

btnStart.addEventListener('click', onBtnStart);
btnStart.setAttribute("disabled", true);

flatpickr(inputDateTimePicker, options);

function onBtnStart() {
    intervalId = setInterval(startTimer, INTERVAL_DILEY);
};

function chooseDate(selectedDates) {
    const currentDate = Date.now();

    if (selectedDates < currentDate) {
        btnStart.setAttribute("disabled", true);
        Notify.failure("Please choose a date in the future");   
    }

    btnStart.removeAttribute("disabled");
    timerTime = selectedDates.getTime() - currentDate;
    formatDate = convertMs(timerTime);
    console.log(formatDate);
    timeNow(formatDate);
};

function startTimer() {
    btnStart.setAttribute("disabled", true);
    timerTime -= 1000;

    if (seconds.textContent <= 0 && minutes.textContent <= 0) {
        сlearInterval(intervalId);
    } 

    formatDate = convertMs(timerTime);
    timeNow(formatDate);
};

function pad(value) {
    return String(value).padStart(2, '0');
}

function timeNow(formatDate) {
    
    days.textContent = pad(formatDate.days); 
    hours.textContent = pad(formatDate.hours);
    minutes.textContent = pad(formatDate.minutes);
    seconds.textContent = pad(formatDate.seconds);
} 