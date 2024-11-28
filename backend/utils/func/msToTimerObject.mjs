export const msToTimerObject = (timeMS) => {
  const totalSeconds = Math.floor(timeMS / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const format = (num) => String(num).padStart(2, "0");

  return {
    hours,
    minutes,
    seconds,
    total: `${format(hours)}:${format(minutes)}:${format(seconds)}`,
  };
};
