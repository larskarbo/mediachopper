import electron from "electron";

import Head from "next/head";
import * as Papa from "papaparse";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import RenderSection from "../components/RenderSection";
import { UploadBox } from "../components/UploadBox";
import { Segment, Video } from "../components/utils/types";
import Timecode from "smpte-timecode";
import { tcToString } from "../components/utils/tcToString";
import Layout from "../components/Layout";

const ipcRenderer = electron.ipcRenderer;

function Chopper() {
  const [selectedVideoFile, setSelectedVideoFile] = useState(null);
  const [selectedIndexFile, setSelectedIndexFile] = useState(null);
  const [segments, setSegments] = useState<Segment[]>(null);
  const [video, setVideo] = useState<Video>(null);
  console.log("segments: ", segments);

  const onDrop = useCallback((acceptedFiles) => {
    const rawFile = acceptedFiles[0];
    console.log("rawFile: ", rawFile);

    setSelectedVideoFile(rawFile);

    ipcRenderer.send("videometa", { path: rawFile.path });

    // const fileURL = URL.createObjectURL(rawFile)
    // videoRef.current.src = fileURL
  }, []);

  React.useEffect(() => {
    // like componentDidMount()

    // register `ping-pong` event
    ipcRenderer.on("error", (event, data) => {
      console.log("error: ", data);
      alert(data.err);
    });
    ipcRenderer.on("videometaStartLoad", (event, data) => {
      console.log("data: ", data);
      // alert("videometa start load +" + JSON.stringify(data))
    });
    ipcRenderer.on("videometa", (event, data) => {
      console.log("data: ", data);
      if (data?.ffprobe?.streams?.[0]) {
        setVideo({
          path: data.path,
          stream: data.ffprobe.streams[0],
        });
      }
    });

    return () => {
      // like componentWillUnmount()

      // unregister it
      ipcRenderer.removeAllListeners("videometa");
    };
  }, []);

  const onDropIndex = useCallback(async (acceptedFiles) => {
    const rawFile = acceptedFiles[0];
    console.log("rawFile: ", rawFile);

    // setVideo(rawFile.name);

    setSelectedIndexFile(rawFile);
    const contents: string = await new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        console.log("loaded");
        if (typeof e.target.result != "string") {
          throw new Error("Couldn't read file...");
        }
        resolve(e.target.result);
      };
      reader.readAsText(rawFile);
    });

    const results = Papa.parse<any>(contents, { header: true });

    const relevant = results.data.filter((t) => t.V == "V1");
    console.log("relevant: ", relevant);

    const firstTimeCode = () => Timecode(relevant[0]["Record In"], 30);

    const better = relevant.map((element) => {
      console.log("element: ", element);
      const fromTime = Timecode(element["Record In"], 30).subtract(
        firstTimeCode()
      );
      console.log("fromTime: ", fromTime);
      const toTime = Timecode(element["Record Out"], 30).subtract(
        firstTimeCode()
      );
      const diff = Timecode(toTime).subtract(Timecode(fromTime));
      const segment: Segment = {
        from: fromTime,
        to: toTime,
        duration: diff.seconds + diff.frames / 30,
        fromTime: tcToString(fromTime),
        toTime: tcToString(toTime),
      };
      return segment;
    });

    setSegments(better);

    // const fileURL = URL.createObjectURL(rawFile)
    // videoRef.current.src = fileURL
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  const {
    getRootProps: getRootPropsIndex,
    getInputProps: getInputPropsIndex,
    isDragActive: isDragActiveIndex,
  } = useDropzone({ onDrop: onDropIndex });

  return (
    <Layout>
      <div className="w-full py-12">
        <Section title="Source Video">
          <div className="grid gap-8 grid-cols-2">
            <div>
              <UploadBox
                text="Drop a video file here."
                getInputProps={getInputProps}
                getRootProps={getRootProps}
                isDragActive={isDragActive}
                selectedFile={selectedVideoFile}
                reset={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setSelectedVideoFile(null);
                }}
              />

              {video && video.path}
            </div>
            <div>
              <p>
                In <strong>DaVinci Resolve</strong> go to{" "}
                <strong>Deliver</strong> and export the entire timeline with
                your preferred render configuration.
              </p>
              <p>Select the rendered file here.</p>
            </div>
          </div>
        </Section>

        <hr className="border-t-1 mx-12 border-black my-8" />

        <Section title="Split Info CSV">
          <div className="w-full grid gap-8 grid-cols-2">
            <div>
              <UploadBox
                text="Drop a timeline export file here."
                getInputProps={getInputPropsIndex}
                getRootProps={getRootPropsIndex}
                isDragActive={isDragActiveIndex}
                selectedFile={selectedIndexFile}
                reset={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setSelectedIndexFile(null);
                }}
              />
              {segments && segments.length}
            </div>

            <div>
              <p>
                In <strong>DaVinci Resolve</strong>, go to{" "}
                <strong>Media</strong> and right click on your timeline. In the
                context menu, press <strong>Timelines</strong> {">"}{" "}
                <strong>Export</strong> {">"} <strong>Edit Index...</strong>
              </p>
              <img
                className="border border-gray-600 rounded"
                src="/export-index.png"
              />
              <p>Select the exported CSV file here.</p>
            </div>
          </div>
        </Section>

        <hr className="border-t-1 mx-12 border-black my-8 " />

        <div className="w-full px-12">
          <div>
            <h2 className="font- text-gray-50 text-sm">Render Clips</h2>
            {video && segments ? (
              <RenderSection video={video} segments={segments} />
            ) : (
              <p>Select a source video and split info csv first.</p>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Chopper;

function Section({ title, children }) {
  return (
    <div className="w-full   px-12">
      <h2 className="font- text-gray-50 text-sm">{title}</h2>
      {children}
    </div>
  );
}
