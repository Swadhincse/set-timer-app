let timers = [];

function startNewTimer() {
  const hours = parseInt(document.getElementById('hours').value) || 0;
  const minutes = parseInt(document.getElementById('minutes').value) || 0;
  const seconds = parseInt(document.getElementById('seconds').value) || 0;

  const totalTimeInSeconds = hours * 3600 + minutes * 60 + seconds;

  if (totalTimeInSeconds > 0) {
    const timer = {
      totalTime: totalTimeInSeconds,
      timeRemaining: totalTimeInSeconds,
      intervalId: setInterval(() => {
        updateTimer(timer);
      }, 1000),
    };

    timers.push(timer);
    updateActiveTimersDisplay();
  }
}

function updateTimer(timer) {
  timer.timeRemaining--;

  if (timer.timeRemaining <= 0) {
    clearInterval(timer.intervalId);
    playAudio();
  }

  updateActiveTimersDisplay();
}

function stopTimer(index) {
  clearInterval(timers[index].intervalId);
  timers.splice(index, 1);
  updateActiveTimersDisplay();
}

function updateActiveTimersDisplay() {
  const activeTimersContainer = document.getElementById('activeTimers');
  activeTimersContainer.innerHTML = '';

  timers.forEach((timer, index) => {
    const timerElement = document.createElement('div');
    timerElement.classList.add('timer');
    if (timer.timeRemaining <= 0) {
      timerElement.classList.add('timer-ended');
    }
    timerElement.innerHTML = `
      <div>${formatTime(timer.timeRemaining)}</div>
      <button onclick="stopTimer(${index})">Stop Timer</button>
    `;
    activeTimersContainer.appendChild(timerElement);
  });
}

function formatTime(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  return `${hours}:${padZero(minutes)}:${padZero(remainingSeconds)}`;
}

function padZero(num) {
  return num < 10 ? `0${num}` : num;
}

function playAudio() {
  const audio = document.getElementById('timerAudio');
  audio.play();
}
