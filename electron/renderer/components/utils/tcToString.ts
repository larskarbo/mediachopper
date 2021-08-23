export const tcToString = (tc) => {
  console.log("tc: ", tc);
  return (
    tc.hours.toString().padStart(2, "0") +
    ":" +
    tc.minutes.toString().padStart(2, "0") +
    ":" +
    tc.seconds.toString().padStart(2, "0") +
    "." +
    Math.round((tc.frames / 30) * 1000)
  );
};
