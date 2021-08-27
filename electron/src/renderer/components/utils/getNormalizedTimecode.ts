import Timecode from "smpte-timecode";

export const getNormalizedTimecode = (tString: string, frameRate: Timecode.FRAMERATE) => {
  const tc = Timecode(tString, frameRate);

  if (tc.hours === 1) {
    tc.subtract(frameRate * 60 * 60);
  }

  return tc;
};
  