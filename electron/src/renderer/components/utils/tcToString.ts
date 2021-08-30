import Timecode from "smpte-timecode";

export const tcToString = (tc: Timecode.TimecodeObject) => {
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

export const tcToSeconds = (tc: Timecode.TimecodeObject) => {
  return (
    tc.hours * 3600 + tc.minutes * 60 + tc.seconds + tc.frames / tc.frameRate
  );
};
