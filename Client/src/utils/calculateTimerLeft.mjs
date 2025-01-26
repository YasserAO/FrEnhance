export const calculateTimeLeft = (time) => {
  if (time <= 0) return { m: 0, s: 0 };

  return {
    m:
      Number(Math.floor((time / (1000 * 60)) % 60)).toString().length == 2
        ? Math.floor((time / (1000 * 60)) % 60)
        : "0" + Number(Math.floor((time / (1000 * 60)) % 60)).toString(),
    s:
      Number(Math.floor((time / 1000) % 60)).toString().length == 2
        ? Math.floor((time / 1000) % 60)
        : "0" + Number(Math.floor((time / 1000) % 60)).toString(),
  };
};
