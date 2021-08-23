import clsx from "clsx";
import electron from "electron";
import { FfprobeData } from "fluent-ffmpeg";
import * as Papa from "papaparse";
import React, { useCallback, useState } from "react";
import roundTo from "round-to";
import Timecode from "smpte-timecode";
import Layout from "../components/Layout";
import RenderSection from "../components/RenderSection";
import { tcToString } from "../components/utils/tcToString";
import { Segment, Video } from "../components/utils/types";
import { VinciH2 } from "../components/VinciH2";
import { FileField } from "./../components/FileField";

const ipcRenderer = electron.ipcRenderer;
const getNormalizedTimecode = (
  tString: string,
  frameRate: Timecode.FRAMERATE
) => {
  const tc = Timecode(tString, frameRate);
  if (tc.hours === 1) {
    tc.subtract(frameRate * 60 * 60);
  }
  return tc;
};

function Chopper() {
  const [selectedVideoFile, setSelectedVideoFile] = useState(null);
  const [selectedIndexFile, setSelectedIndexFile] = useState(null);
  const [segments, setSegments] = useState<Segment[]>(null);
  const [video, setVideo] = useState<Video>(null);

  const handleVideo = (rawFile) => {
    setSelectedVideoFile(rawFile);

    ipcRenderer.send("videometa", { path: rawFile.path });
  };

  React.useEffect(() => {
    ipcRenderer.on("error", (event, data) => {
      alert(data.err);
    });
    ipcRenderer.on(
      "videometa",
      (event, data: { ffprobe: FfprobeData; path: string }) => {
        if (data?.ffprobe?.streams?.[0]) {
          setVideo({
            path: data.path,
            stream: data.ffprobe.streams[0],
            frameRate: parseFloat(
              data.ffprobe.streams[0].r_frame_rate.split("/")[0]
            ),
          });
        }
      }
    );

    return () => {
      ipcRenderer.removeAllListeners("videometa");
      ipcRenderer.removeAllListeners("error");
    };
  }, []);

  console.log("video: ", video);

  const handleIndex = useCallback(
    async (rawFile) => {
      if (!video) {
        console.log("video: ", video);
        alert("Please select a video first");
        return;
      }

      const frameRate: Timecode.FRAMERATE = video.frameRate;

      setSelectedIndexFile(rawFile);
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

      const firstTimeCode = () =>
        getNormalizedTimecode(relevant[0]["Record In"], frameRate);

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

  return (
    <Layout>
      <div className="w-full">
        <VinciH2>Source video</VinciH2>
        <div className="border border-black rounded py-8">
          <p className="text-xs px-8 mb-2">
            The video file that you want to batch split. (mp4, mov, avi, etc...)
          </p>
          <FileField
            onSelectFile={handleVideo}
            selectedFile={selectedVideoFile}
            text={"Source video file"}
          />
          {video?.stream?.duration && (
            <div>
              <div className="text-xs px-8 my-2">
                ✅ The selected video is{" "}
                <strong>{video.stream.duration} </strong>
                seconds long.
              </div>
              <div className="text-xs px-8 my-2">
                ✅ The selected video has a frame rate of{" "}
                <strong>{video.frameRate} </strong> FPS.
              </div>
            </div>
          )}
        </div>
        <VinciH2>Segment Info File</VinciH2>
        <div className="border border-black rounded py-8">
          <p className="text-xs px-8 mb-2">
            Currently we only support <strong>Edit Index</strong> export from{" "}
            <strong>DaVinci Resolve</strong>
          </p>
          <FileField
            disabled={!selectedVideoFile}
            onSelectFile={handleIndex}
            text={"Timeline info"}
            selectedFile={selectedIndexFile}
          />
          {segments?.length > 0 && (
            <>
              <div className="text-xs px-8 my-2">
                ✅ We found <strong>{segments.length} possible segments</strong>
                .
              </div>
              <div className="px-8 w-full">
                <table
                  className=" text-xs bg-gray-900 w-full table-fixed  overflow-y-scroll"
                  style={{
                    maxHeight: "100px",
                    height: "100px",
                  }}
                >
                  <thead className="w-full flex">
                    <tr>
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
                      height: 104,
                    }}
                  >
                    {segments?.map((segment, i) => (
                      <tr
                        className={clsx(
                          "w-full",
                          i % 2 ? "bg-gray-800" : "bg-gray-700"
                        )}
                        key={i}
                      >
                        <td className="w-8">{i}</td>
                        <td className="w-28">{segment.fromTime}</td>
                        <td className="w-28">{segment.toTime}</td>
                        <td className="w-16">
                          {roundTo(segment.duration, 1)} s
                        </td>
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
        <hr className="border-t-1  border-black my-8 " />

        <div>
          <VinciH2>Chop Segments</VinciH2>
          <RenderSection video={video} segments={segments} />
        </div>
      </div>
    </Layout>
  );
}

export default Chopper;
