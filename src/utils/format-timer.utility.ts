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
  console.log(miliseconds);

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
