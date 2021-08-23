import React from "react";
import Layout from "../components/Layout";

function Instructions() {
  return (
    <Layout>
      <div className="flex flex-col instructions">
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
      </div>
    </Layout>
  );
}

export default Instructions;
