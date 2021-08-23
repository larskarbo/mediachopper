export const FPS = 24;
export const fpms = (ms: number) => Math.round((FPS / 1000) * ms);
export const OUTRO_DURATION = FPS * 3;
export const AUDIO_PADDING = FPS;

export type AvatarType = {
  name: string;
};
