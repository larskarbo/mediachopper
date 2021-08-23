import clsx from "clsx";
import electron from "electron";
import React, { useEffect, useRef, useState } from "react";
import { StartRenderProps } from "./utils/types";
import { useInput } from "./utils/useInput";
import { VinciButton } from "./VinciButton";
import { VinciInput } from "./VinciInput";
const ipcRenderer = electron.ipcRenderer;

export default function RenderSection({ video, segments }) {
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
      setProgress({
        currentIndex: data.currentIndex,
        totalNumber: data.totalNumber,
        currentFile: data.currentFile,
      });
    });
    ipcRenderer.on("renderDone", (event, data) => {
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
      <div className="border border-black rounded py-8">
        <div className={clsx("flex items-center text-xs py-2 gap-2 pr-8  ")}>
          <div className="text-gray-400 w-32 text-right">Output name:</div>
          <VinciInput {...baseNameInput} />
        </div>
        <div className="text-xs px-8 my-2">
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
      <div className="flex mt-4 justify-end">
        <VinciButton disabled={!video || !segments} onClick={render}>
          Start!
        </VinciButton>
      </div>

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
            className="w-full rounded"
            value={(progress?.currentIndex || 0) + 1}
            max={segments.length + 1}
          ></progress>
        </div>
      )}
    </div>
  );
}
