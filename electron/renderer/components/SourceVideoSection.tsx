import clsx from "clsx";
import electron from "electron";
import { FfprobeData } from "fluent-ffmpeg";
import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { useChopper } from "./chopper-context";
import { FileField } from "./FileField";
import { Video } from "./utils/types";
import { VinciH2 } from "./VinciH2";

const ipcRenderer = electron.ipcRenderer;

export default function SourceVideoSection({
  video,
  setVideo,
}: {
  video: Video;
  setVideo: (video: Video) => void;
}) {
  const {selectedVideoFile, setSelectedVideoFile} = useChopper()

  const handleVideo = (acceptedFiles) => {
    const rawFile: File = acceptedFiles[0];
    setSelectedVideoFile(rawFile);

    ipcRenderer.send("videometa", { path: rawFile.path });
  };

  React.useEffect(() => {
    ipcRenderer.on("error", (event, data) => {
      alert(data.err);
    });
    ipcRenderer.on(
      "videometa",
      (
        event,
        data: { ffprobe: FfprobeData; path: string; extension: string }
      ) => {
        if (data?.ffprobe?.streams?.[0]) {
          setVideo({
            path: data.path,
            stream: data.ffprobe.streams[0],
            frameRate: parseFloat(
              data.ffprobe.streams[0].r_frame_rate.split("/")[0]
            ),
            extension: data.extension,
          });
        }
      }
    );

    return () => {
      ipcRenderer.removeAllListeners("videometa");
      ipcRenderer.removeAllListeners("error");
    };
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleVideo,
  });

  return (
    <>
      <VinciH2>1. Source video</VinciH2>
      <div
        className={clsx(
          "border border-black rounded py-8",
          isDragActive ? "bg-gray-900" : ""
        )}
        {...getRootProps()}
        onClick={() => {}}
      >
        <p className="text-xs px-8 mb-2">
          The video file that you want to batch split. (mp4, mov, avi, etc...)
        </p>
        <FileField
          getRootProps={getRootProps}
          getInputProps={getInputProps}
          isDragActive={isDragActive}
          selectedFile={selectedVideoFile}
          text={"Source video file"}
        />
        {video?.stream?.duration && (
          <div>
            <div className="text-xs px-8 my-2">
              ✅ The selected video is <strong>{video.stream.duration} </strong>
              seconds long.
            </div>
            <div className="text-xs px-8 my-2">
              ✅ The selected video has a frame rate of{" "}
              <strong>{video.frameRate} </strong> FPS.
            </div>
          </div>
        )}
      </div>
    </>
  );
}
