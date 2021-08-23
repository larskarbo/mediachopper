import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { useInput } from "./utils/useInput";
import electron from "electron";
import { StartRenderProps } from "./utils/types";
import Button from "./Button";
const ipcRenderer = electron.ipcRenderer;

export default function RenderSection({ video, segments }) {
  console.log("segments: ", segments);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(null);
  const baseNameInput = useInput("clip");
  const folderRef = useRef(null);

  useEffect(() => {
    if (folderRef.current) {
      folderRef.current.setAttribute("webkitdirectory", "true");
    }
  }, [folderRef]);

  useEffect(() => {}, [video, segments]);

  const render = () => {
    setLoading(true);
    const props: StartRenderProps = {
      segments,
      video,
      baseName: baseNameInput.value,
    };
    ipcRenderer.send("startrender", props);
  };

  React.useEffect(() => {
    // like componentDidMount()

    // register `ping-pong` event
    ipcRenderer.on("renderProgress", (event, data) => {
      console.log("data: ", data);
      setProgress({
        currentIndex: data.currentIndex,
        totalNumber: data.totalNumber,
        currentFile: data.currentFile,
      });
    });
    ipcRenderer.on("renderDone", (event, data) => {
      console.log("data: ", data);
      setLoading(null);
      setProgress(null);
    });

    return () => {
      // like componentWillUnmount()

      // unregister it
      ipcRenderer.removeAllListeners("renderProgress");
      ipcRenderer.removeAllListeners("renderDone");
    };
  }, []);

  return (
    <div>
      <p>
        The video is <strong>{video.stream.duration} </strong>seconds long.
      </p>
      <p>
        We found <strong>{segments.length} clips</strong>.
      </p>

      <div className="text-sm">
        <div>Output name:</div>
        <div className="flex items-center gap-4">
          <input className="my-4" type="text" {...baseNameInput} />
          <span className="italic text-xs">
            Example: {baseNameInput.value}0001.mp4, {baseNameInput.value}
            0002.mp4, {baseNameInput.value}0003.mp4
          </span>
        </div>
      </div>
      {/* <div className="text-sm">
        <div>Output folder:</div>
        <div className="flex items-center gap-4">
          <input onChange={e => {
            console.log(e.target.value);
          }} type="file" hidden ref={folderRef} />
          <button onClick={() => {
            folderRef.current.click()
          }}>Select folder</button>
          <span className="italic text-xs">
            Currently selected: {folderRef?.current?.value}
          </span>
        </div>
      </div>
     */}

      <Button loading={loading} onClick={render}>
        Split files!
      </Button>

      {loading && (
        <div className="flex flex-col gap-2 my-4">
          <div>
            {progress?.currentFile && (
              <span className="italic text-xs">
                Rendering: {progress.currentFile}
              </span>
            )}
          </div>
          <progress
            value={(progress?.currentIndex || 0) + 1}
            max={segments.length + 1}
          ></progress>
        </div>
      )}
    </div>
  );
}
