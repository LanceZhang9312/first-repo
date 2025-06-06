const bells = new Audio('pomodoro/mixkit-bell-notification-933.wav'); 
const startBtn = document.querySelector('.btn-start'); 
const session = document.querySelector('.minutes'); 
const pauseBtn = document.querySelector('.btn-pause'); 
const resetBtn = document.querySelector('.btn-reset'); 

let myInterval; 
let state = true;
let remainSeconds = 0;
let pause = false;
let totalSeconds = 0;

const appTimer = () => {
  const sessionAmount = Number.parseInt(session.textContent)

  if(state) {
    state = false;
    if(pause){
        totalSeconds = remainSeconds;
    }else{
        totalSeconds = sessionAmount * 60;
    }

    const updateSeconds = () => {
        const minuteDiv = document.querySelector('.minutes');
        const secondDiv = document.querySelector('.seconds');

        totalSeconds--;
        remainSeconds = totalSeconds;

        let minutesLeft = Math.floor(totalSeconds/60);
        let secondsLeft = totalSeconds % 60;

        if(secondsLeft < 10) {
            secondDiv.textContent = '0' + secondsLeft;
        } else {
            secondDiv.textContent = secondsLeft;
        }
        minuteDiv.textContent = `${minutesLeft}`

        if(minutesLeft === 0 && secondsLeft === 0) {
            bells.play()
            clearInterval(myInterval);
        }
    }
    myInterval = setInterval(updateSeconds, 1000);
  } else {
    alert('Session has already started.')
  }
}

const pauseTimer = () => {

  if(state) {
    alert('Session is not started.')
  } else {
    state = true;
    pause = true;
    let totalSeconds = remainSeconds;

    const pauseSeconds = () => {
        const minuteDiv = document.querySelector('.minutes');
        const secondDiv = document.querySelector('.seconds');     

        let minutesLeft = Math.floor(totalSeconds/60);
        let secondsLeft = totalSeconds % 60;

        if(secondsLeft < 10) {
            secondDiv.textContent = '0' + secondsLeft;
        } else {
            secondDiv.textContent = secondsLeft;
        }
        minuteDiv.textContent = `${minutesLeft}`
    }
    clearInterval(myInterval);
  }
}

const resetTimer = () => {
    clearInterval(myInterval);

    state = true;
    remainSeconds = 0;
    pause = false;
    totalSeconds = 0;

    const minuteDiv = document.querySelector('.minutes');
    const secondDiv = document.querySelector('.seconds');

    minuteDiv.textContent = `25`;
    secondDiv.textContent = `00`;
}

startBtn.addEventListener('click', appTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);