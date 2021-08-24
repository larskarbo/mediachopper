import {} from "./../components/utils/getNormalizedTimecode";
import clsx from "clsx";
import { FfprobeData } from "fluent-ffmpeg";
import * as Papa from "papaparse";
import React, { useCallback, useState } from "react";
import roundTo from "round-to";
import Timecode from "smpte-timecode";
import Layout from "../components/Layout";
import RenderSection from "../components/RenderSection";
import VinciSelect from "../components/VinciSelect";
import { tcToString } from "../components/utils/tcToString";
import { Segment, Video } from "../components/utils/types";
import { VinciH2 } from "../components/VinciH2";
import { FileField } from "./../components/FileField";
import MemoResolveIcon from "../components/icons/ResolveIcon";
import VinciFormField from "../components/VinciFormField";
import SegmentInfoSection from "../components/SegmentInfoSection";
import SourceVideoSection from "../components/SourceVideoSection";

function Chopper() {
  const [segments, setSegments] = useState<Segment[]>(null);
  const [video, setVideo] = useState<Video>(null);

  console.log("video: ", video);

  return (
    <Layout>
      <div className="w-full">
        <SourceVideoSection video={video} setVideo={setVideo} />

        <SegmentInfoSection
          segments={segments}
          video={video}
          setSegments={setSegments}
        />

        <RenderSection video={video} segments={segments} />
      </div>
    </Layout>
  );
}

export default Chopper;
