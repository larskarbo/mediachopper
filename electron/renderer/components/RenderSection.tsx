import clsx from "clsx";
import electron from "electron";
import React, { useEffect, useRef, useState } from "react";
import { Segment, StartRenderProps, Video } from "./utils/types";
import { useInput } from "./utils/useInput";
import { VinciButton } from "./VinciButton";
import VinciFormField from "./VinciFormField";
import { VinciH2 } from "./VinciH2";
import { VinciInput } from "./VinciInput";
import VinciSelect, { VinciSelectOption } from "./VinciSelect";
import slugify from "@sindresorhus/slugify";

const ipcRenderer = electron.ipcRenderer;

const outputStrategies: VinciSelectOption[] = [
  {
    title: "Lossless quick splitting. Use same format as source.",
  },
];

export default function RenderSection({
  video,
  segments,
}: {
  video: Video;
  segments: Segment[];
}) {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(null);
  const baseNameInput = useInput("clip");
  const folderRef = useRef(null);
  const [renderStrategy, setRenderStrategy] = useState(outputStrategies[0]);
  const [markerNames, setMarkerNames] = useState(true);
  const [slugifyNames, setSlugifyNames] = useState(true);

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

  const outputFilenames = segments
    ?.filter((s) => s.selected)
    .map((s, i) => {
      const extension = video.extension;
      if (markerNames && s.text?.length > 0) {
        if (slugifyNames) {
          return slugify(s.text) + extension;
        }
        return s.text + extension;
      }
      return baseNameInput.value + i.toString().padStart(4, "0") + extension;
    }) || []

  return (
    <div
      className={clsx(
        "",
        video && segments && segments.length > 0 ? "opacity-100" : "opacity-50"
      )}
    >
      <VinciH2>3. Output settings</VinciH2>
      <div className="border border-black rounded py-8">
        <VinciFormField label="Render strategy">
          <VinciSelect
            onSelect={(v) =>
              setRenderStrategy(
                outputStrategies.find((f) => f.title === v.title)
              )
            }
            className="w-full"
            options={outputStrategies}
            selected={renderStrategy}
          />
        </VinciFormField>
        <VinciFormField label="Output base name">
          <VinciInput {...baseNameInput} />
        </VinciFormField>
        <VinciFormField label="">
          <input
            checked={markerNames}
            onChange={(e) => setMarkerNames(e.target.checked)}
            type="checkbox"
          />{" "}
          Use marker names when possible
        </VinciFormField>
        <VinciFormField label="">
          <input
            checked={!markerNames ? false : slugifyNames}
            onChange={(e) => setSlugifyNames(e.target.checked)}
            type="checkbox"
            disabled={!markerNames}
          />{" "}
          Slugify output file names
        </VinciFormField>

        <VinciFormField label="Outputs">
          {segments && segments.length && (
            <div className="text-gray-300">
              {" "}
              {segments.length} files:{" "}
              <span className="italic  text-xs">{outputFilenames.join(", ")}</span>
            </div>
          )}
        </VinciFormField>
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
