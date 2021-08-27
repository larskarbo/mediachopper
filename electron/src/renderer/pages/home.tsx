import React from 'react';
import Link from 'renderer/components/Link';
import { FaBookOpen, FaHelicopter } from 'react-icons/fa';
import Layout from '../components/Layout';
import logo_dark from "../assets/logo_dark.svg"

function Home() {
  return (
    <Layout>
      <div className="flex flex-col items-center">
        <img src={logo_dark} className="w-full max-w-md mx-auto mb-8" />

        <Box
          href="/instructions"
          Icon={FaBookOpen}
          title="Read instructions"
          description={<p>Check how to use <strong>MediaChopper</strong> for <strong>DaVinci Resolve</strong></p>}
        />
        <Box
          href="/chopper"
          Icon={FaHelicopter}
          title="Go and chop already!"
          description="I have the video file and segment file ready. Let me split my file!"
        />
      </div>
    </Layout>
  );
}

export default Home;

function Box({ href, title, description, Icon }) {
  return (
    <Link href={href}>
      <div className="flex group hover:bg-black cursor-pointer mb-8 gap-8 max-w-md border-2 bg-gray-900 border-gray-600 p-8">
        <div className="text-gray-100">
          <Icon size={40} />
        </div>
        <div>
          <div className="font-bold text-gray-50 group-hover:underline">
            {title}
          </div>
          <div className="text-gray-200 font-light">
            {description}
          </div>
        </div>
      </div>
    </Link>
  );
}
