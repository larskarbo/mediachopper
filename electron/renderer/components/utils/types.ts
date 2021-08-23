import { FfprobeData } from "fluent-ffmpeg";

export type Video = {
  path: string;
  frameRate: number;
  stream: FfprobeData["streams"][0];
};

export type Segment = {
  from: any;
  to: any;
  duration: number;
  fromTime: string;
  toTime: string;
  type: string;
  text: string;
  selected: boolean;
};

export type StartRenderProps = {
  segments: Segment[];
  video: Video;
  baseName: string;
};
