import React from 'react';
import { useChopper } from '../components/chopper-context';
import Layout from '../components/Layout';
import RenderSection from '../components/RenderSection';
import SegmentInfoSection from '../components/SegmentInfoSection';
import SourceVideoSection from '../components/SourceVideoSection';

function Chopper() {
  const { segments, setSegments, video, setVideo } = useChopper();

  

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
