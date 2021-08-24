import React, { useState } from "react";
import { Segment, Video } from "./utils/types";

//@ts-ignore
const ChopperContext = React.createContext<Horse>({});

type Horse = {
  segments: Segment[];
  setSegments: (segments: Segment[]) => void;
  video: Video;
  setVideo: (video: Video) => void;
  selectedVideoFile: any;
  setSelectedVideoFile: any;
  selectedTimelineFile: any;
  setSelectedTimelineFile: any;
};

export function ChopperProvider({ children }) {
  const [segments, setSegments] = useState<Segment[]>(null);
  const [video, setVideo] = useState<Video>(null);
  const [selectedVideoFile, setSelectedVideoFile] = useState(null);
  const [selectedTimelineFile, setSelectedTimelineFile] = useState(null);

  return (
    <ChopperContext.Provider
      value={{
        segments,
        setSegments,
        video,
        setVideo,

        selectedVideoFile,
        setSelectedVideoFile,
        selectedTimelineFile,
        setSelectedTimelineFile,
      }}
    >
      {children}
    </ChopperContext.Provider>
  );
}

export function useChopper() {
  const context: Horse = React.useContext(ChopperContext);
  if (context === undefined) {
    throw new Error("useChopper must be used within a ChopperProvider");
  }
  return context;
}
