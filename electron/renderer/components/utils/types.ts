export type Video = {
  path: string;
  stream: any;
};

export type Segment = {
  from: any;
  to: any;
  duration: number;
  fromTime: string;
  toTime: string;
};

export type StartRenderProps = {
  segments: Segment[];
  video: Video;
  baseName: string;
};
