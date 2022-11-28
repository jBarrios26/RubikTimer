export const formatMinutes = (minute: number): string => {
  if (minute !== 0) {
    return `${minute.toString().padStart(2, '0')}`;
  }
  return '';
};

export const formatSeconds = (seconds: number): string => {
  if (seconds !== 0) {
    return `${seconds.toString().padStart(2, '0')}`;
  } else {
    return `00`;
  }
};

export const formatMiliseconds = (miliseconds: number, isRunning: boolean) => {
  if (miliseconds !== 0 || isRunning) {
    if (isRunning)
      return `${Math.floor(miliseconds / 100)
        .toString()
        .padEnd(1, '0')}`;
    else
      return `${Math.floor(miliseconds / 10)
        .toString()
        .padEnd(2, '0')}`;
  } else {
    return `00`;
  }
};

export const formatTime = (totalMilliseconds: number): string => {
  if (totalMilliseconds < 0) {
    return '--.--';
  }
  const minutesPassed = Math.floor(totalMilliseconds / 60000);
  const secondsPassed = Math.floor(
    (totalMilliseconds - minutesPassed * 60000) / 1000
  );
  const milisecondsPassed =
    totalMilliseconds - minutesPassed * 60000 - secondsPassed * 1000;
  return `${formatMinutes(minutesPassed)}${
    minutesPassed > 0 ? ':' : ''
  }${formatSeconds(secondsPassed)}:${formatMiliseconds(
    milisecondsPassed,
    false
  )}`;
};
