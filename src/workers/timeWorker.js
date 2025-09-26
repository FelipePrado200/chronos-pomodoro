let isRunning = false;

self.onmessage = function (e) {
  if (isRunning === true) return;

  isRunning = true;

  const state = e.data;
  const { activeTask, secondsRemaining } = state;

  const endDate = activeTask.startDate + secondsRemaining * 1000;

  function tick() {
    const now = Date.now();
    let countDownSeconds = Math.max(
      Math.floor((endDate - now) / 1000),
      0 // nunca deixar negativo
    );

    self.postMessage(countDownSeconds);

    if (countDownSeconds > 0) {
      setTimeout(tick, 1000);
    } else {
      isRunning = false; // libera para próxima task
    }
  }

  tick();
};
