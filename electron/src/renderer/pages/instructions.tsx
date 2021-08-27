import React, { useState } from "react";
import MemoResolveIcon from "../components/icons/ResolveIcon";
import Layout from "../components/Layout";
import { supportedFiles } from "../components/SegmentInfoSection";
import VinciFormField from "../components/VinciFormField";
import VinciSelect from "../components/VinciSelect";
import ReactPlayer from "react-player/youtube";
import explanation from "../assets/explanation.svg"

function Instructions() {
  const [fileType, setFileType] = useState(supportedFiles[0]);

  return (
    <Layout>
      <div className="flex flex-col instructions">
        <h1>MediaChopper</h1>

        <p>
          MediaChopper works by reading metadata from your editor and splitting
          the output file based on it.
        </p>

        <img
          src={explanation}
          className="max-w-lg border rounded border-black bg-gray-900"
        />
        <h2>Features</h2>
        <div>
          <ul className=" flex flex-col gap-1 list-inside list-disc text-gray-100 text-sm">
            <li>🦾 Lossless, match source</li>
            <li>⚡ Extremenly fast</li>
            <li>
              <MemoResolveIcon className="inline" /> Works with different
              editors
            </li>
            <li>📽️ Works with video and audio</li>
            <li>✂️ Split based on markers</li>
            <li>✂️ Split based on segments</li>
            <li>✂️ Split based on arbitrary metadata</li>
          </ul>
        </div>
        <h2>How To Get Timeline Info?</h2>

        <div className="mb-4">
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
        </div>
        <p>This video shows you how to export <strong>Edit Index</strong> in DaVinci Resolve.</p> 
        <p>The can be configured to include <strong>segments</strong> from your timeline, <strong>colored clips</strong> or <strong>markers</strong>.</p> 
        <ReactPlayer controls  url="https://youtu.be/WcAetUzN6Oc?t=54" />
        {/* <p>
          In <strong>DaVinci Resolve</strong>, go to <strong>Media</strong> and
          right click on your timeline. In the context menu, press{" "}
          <strong>Timelines</strong> {">"} <strong>Export</strong> {">"}{" "}
          <strong>Edit Index...</strong>
        </p>
        <img
          className="border border-gray-600 rounded"
          src="/export-index.png"
        />
        <p>Select the exported CSV file here.</p> */}

        <h2>How To Export Video file</h2>
        <p>
          Just export your whole project with your preferred render settings.
        </p>
      </div>
      {/* <div className="flex flex-col instructions">
        <h1>Instructions for DaVinci Resolve</h1>
        <h2>Finding the source video</h2>
        <div>
          <p>
            In <strong>DaVinci Resolve</strong> go to <strong>Deliver</strong>{" "}
            and export the entire timeline with your preferred render
            configuration.
          </p>
          <p>Select the rendered file here.</p>
        </div>
        <h2>Finding the timeline info</h2>
        <div>
          <p>
            In <strong>DaVinci Resolve</strong>, go to <strong>Media</strong>{" "}
            and right click on your timeline. In the context menu, press{" "}
            <strong>Timelines</strong> {">"} <strong>Export</strong> {">"}{" "}
            <strong>Edit Index...</strong>
          </p>
          <img
            className="border border-gray-600 rounded"
            src="/export-index.png"
          />
          <p>Select the exported CSV file here.</p>
        </div>
      </div> */}
    </Layout>
  );
}

export default Instructions;
