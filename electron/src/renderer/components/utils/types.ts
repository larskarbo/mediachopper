import { FfprobeData } from "fluent-ffmpeg";
import Timecode from "smpte-timecode";

export type Video = {
  path: string;
  frameRate: number;
  stream: FfprobeData["streams"][0];
  extension: string;
};

export type Segment = {
  from: Timecode.TimecodeObject;
  to: Timecode.TimecodeObject;
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
