import clsx from "clsx";
import * as Papa from "papaparse";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import roundTo from "round-to";
import Timecode from "smpte-timecode";
import { FileField } from "./FileField";
import MemoResolveIcon from "./icons/ResolveIcon";
import { getNormalizedTimecode } from "./utils/getNormalizedTimecode";
import { tcToString } from "./utils/tcToString";
import { Segment } from "./utils/types";
import VinciFormField from "./VinciFormField";
import { VinciH2 } from "./VinciH2";
import VinciSelect from "./VinciSelect";

export const supportedFiles = [
  {
    title: "DaVinci Resolve Edit Index (csv)",
    icon: MemoResolveIcon,
  },
];

export default function SegmentInfoSection({ video, setSegments, segments }) {
  const [fileType, setFileType] = useState(supportedFiles[0]);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleIndex = useCallback(
    async (acceptedFiles) => {
      if (!video) {
        console.log("video: ", video);
        alert("Please select a video first");
        return;
      }
      const rawFile: File = acceptedFiles[0];

      setSelectedFile(rawFile);

      const frameRate: Timecode.FRAMERATE = video.frameRate;

      const contents: string = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (typeof e.target.result != "string") {
            throw new Error("Couldn't read file...");
          }
          resolve(e.target.result);
        };
        reader.readAsText(rawFile);
      });

      const results = Papa.parse<any>(contents, { header: true });

      const relevant = results.data
        .filter((t) => t["Record In"])
        .map((a) => ({
          ...a,
          recordIn: getNormalizedTimecode(a["Record In"], frameRate),
          recordOut: getNormalizedTimecode(a["Record Out"], frameRate),
        }));

      const better = relevant.map((element, i) => {
        // const fromTime = element.recordIn.subtract(firstTimeCode());
        const fromTime = element.recordIn;
        let toTime = element.recordOut;

        let diff = getNormalizedTimecode(toTime, frameRate).subtract(
          getNormalizedTimecode(fromTime, frameRate)
        );

        if (diff.frameCount == 1) {
          if (i < relevant.length - 1) {
            toTime = relevant[i + 1].recordIn;
          } else {
            toTime = Timecode("00:00:00:00", frameRate).add(
              video.stream.nb_frames
            );
            console.log("video.stream: ", video.stream);
            // Timecode.fromSeconds()
          }
        }
        diff = getNormalizedTimecode(toTime, frameRate).subtract(
          getNormalizedTimecode(fromTime, frameRate)
        );

        let type = "Marker";
        if (element.V.includes("V")) {
          type = "Video";
        }
        if (element.V.includes("A")) {
          type = "Audio";
        }

        const segment: Segment = {
          from: fromTime,
          to: toTime,
          duration: diff.seconds + diff.frames / video.frameRate,
          fromTime: tcToString(fromTime),
          toTime: tcToString(toTime),
          type,
          text: element.Notes || "",
          selected: true,
        };
        return segment;
      });

      setSegments(better);

      // const fileURL = URL.createObjectURL(rawFile)
      // videoRef.current.src = fileURL
    },
    [video]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleIndex,
  });

  return (
    <div className={clsx("", video ? "opacity-100" : "opacity-50")}>
      <VinciH2>2. Segment Info File</VinciH2>
      <div
        className={clsx(
          "border border-black rounded py-8",
          isDragActive ? "bg-gray-900" : ""
        )}
        {...getRootProps()}
        onClick={() => {}}
      >
        <p className="text-xs px-8 mb-2">
          Currently we only support <strong>Edit Index</strong> export from{" "}
          <strong>DaVinci Resolve</strong>
        </p>
        <VinciFormField label="File Type">
          <VinciSelect
            onSelect={(v) =>
              setFileType(supportedFiles.find((f) => f.title === v.title))
            }
            className="w-full"
            options={supportedFiles}
            selected={fileType}
          />
        </VinciFormField>
        <FileField
          disabled={!video}
          getRootProps={getRootProps}
          getInputProps={getInputProps}
          isDragActive={isDragActive}
          text={"Timeline info"}
          selectedFile={selectedFile}
        />
        {segments?.length > 0 && (
          <>
            <div className="text-xs px-8 my-2">
              ✅ We found <strong>{segments.length} possible segments</strong>.
            </div>
            <div className="px-8 my-8 w-full">
              <table
                className=" text-xs bg-gray-700 border border-black w-full table-fixed  overflow-y-scroll"
                style={{
                  maxHeight: "100px",
                  height: "100px",
                }}
              >
                <thead className="w-full flex">
                  <tr className="px-2 border-b border-gray-800">
                    <th className="w-8">#</th>
                    <th className="w-28">From</th>
                    <th className="w-28">To</th>
                    <th className="w-16">Duration</th>
                    <th className="w-16">Type</th>
                    <th className="w-48">Text</th>
                    <th className="w-16">Select</th>
                  </tr>
                </thead>
                <tbody
                  className=" table-fixed flex flex-col overflow-y-scroll   w-full"
                  style={{
                    height: 123,
                  }}
                >
                  {segments?.map((segment, i) => (
                    <tr
                      className={clsx(
                        "w-full px-2 text-gray-300" ,
                        i % 2 ? "bg-gray-800" : "bg-gray-750"
                      )}
                      key={i}
                    >
                      <td className="w-8">{i}</td>
                      <td className="w-28">{segment.fromTime}</td>
                      <td className="w-28">{segment.toTime}</td>
                      <td className="w-16">{roundTo(segment.duration, 1)} s</td>
                      <td className="w-16">{segment.type}</td>
                      <td className="w-48">{segment.text}</td>
                      <td className="w-16">
                        <input
                          type="checkbox"
                          checked={segment.selected}
                          onChange={(e) => {
                            setSegments(
                              segments.map((s, ii) => {
                                if (i === ii) {
                                  return {
                                    ...s,
                                    selected: e.target.checked,
                                  };
                                }
                                return s;
                              })
                            );
                          }}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
