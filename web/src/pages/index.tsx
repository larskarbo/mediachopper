import { Layout } from "../components/Layout";
import SEO from "../components/Seo";

import { useDropzone } from "react-dropzone";
import { FaUpload } from "react-icons/fa";
import { useCallback, useRef, useState } from "react";
import * as Papa from "papaparse";

export default function Index() {
  const videoRef = useRef(null);
  const [video, setVideo] = useState(null);
  const [segments, setSegments] = useState(null);
  console.log('segments: ', segments);

  const onDrop = useCallback((acceptedFiles) => {
    const rawFile = acceptedFiles[0];
    console.log("rawFile: ", rawFile);

    setVideo(rawFile.name);

    // const fileURL = URL.createObjectURL(rawFile)
    // videoRef.current.src = fileURL
  }, []);

  const onDropIndex = useCallback(async (acceptedFiles) => {
    const rawFile = acceptedFiles[0];
    console.log("rawFile: ", rawFile);

    // setVideo(rawFile.name);

    const contents: string = await new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        console.log("loaded");
        resolve(e.target.result);
      };
      reader.readAsText(rawFile);
    });

    const results = Papa.parse(contents, { header: true });

    const relevant = results.data.filter((t) => t.V == "V1");
    console.log("relevant: ", relevant);

    setSegments(relevant);

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
    <Layout dark={true}>
      <SEO
        title={"MediaChopper"}
        // description={
        //   ""
        // }
        image={"/og_img.png"}
      />

      <div className="text-center px-4 py-24 flex flex-col items-center">
        Hey! MediaChopper is a video editing platform that allows you to export individual clips from Davinci Resolve.
      </div>

      <button
        onClick={getRootProps().onClick}
        className="ml-4 bg-white p-2 flex flex-row text-gray-500
              border-t border-b border-r border-l rounded"
      >
        Select file <FaUpload className="ml-1 m-auto" />
      </button>

      <input {...getInputProps()} />

      <div
        className={
          "rounded bg-gray-200 relative flex flex-grow h-full border border-gray-300 shadow-lg group " +
          (isDragActive && "border-yellow-500 border-dashed")
        }
        {...getRootProps()}
      >
        Drop here to upload
      </div>

      {video && <div>Video uploaded: {video}</div>}

      <button
        onClick={getRootPropsIndex().onClick}
        className="ml-4 bg-white p-2 flex flex-row text-gray-500
              border-t border-b border-r border-l rounded"
      >
        Select file <FaUpload className="ml-1 m-auto" />
      </button>

      <input {...getInputPropsIndex()} />

      <div
        className={
          "rounded bg-gray-200 relative flex flex-grow h-full border border-gray-300 shadow-lg group " +
          (isDragActive && "border-yellow-500 border-dashed")
        }
        {...getRootPropsIndex()}
      >
        Drop here to upload
      </div>

      {segments && (
        <div>
          {segments.map((s, i) => (
            <div key={i}>
              From: {s["Source In"]}
              To: {s["Source Out"]}
            </div>
          ))}
        </div>
      )}
    </Layout>
  );
}
