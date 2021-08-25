import clsx from "clsx";
import { useState } from "react";
import { FaDownload } from "react-icons/fa";
import Button from "../components/Button";
import MemoResolveIcon from "../components/icons/ResolveIcons";
import { Layout } from "../components/Layout";
import SEO from "../components/Seo";

export default function Index() {
  const [showSeg, setShowSeg] = useState(true);

  return (
    <Layout>
      <SEO
        title={"MediaChopper"}
        // description={
        //   ""
        // }
        image={"/og_img.png"}
      />

      <div className="relative  pt-16 pb-16 ">
        <div className="relative">
          <div className="lg:mx-auto lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:grid-flow-col-dense lg:gap-24">
            <div className="px-4 max-w-xl mx-auto sm:px-6 lg:py-16 lg:max-w-none lg:mx-0 lg:px-0">
              <div>
                <div className="mt-6">
                  <h1 className="text-3xl font-extrabold tracking-tight ">
                    Split video and audio based on <span className="text-blue-400">segments</span> and{" "}
                    <span className="text-blue-400">markers</span>.
                  </h1>
                  <p className="my-4 text-lg text-gray-200">The functionality you wish your editor had!</p>
                  <ul className=" flex flex-col gap-1 list-inside list-disc text-gray-100 text-sm">
                    <li>✂️ Batch split/export based on markers</li>
                    <li>✂️ Batch split/export based on segments</li>
                    <li>✂️ Batch split/export based on arbitrary metadata</li>
                    <li>
                      <MemoResolveIcon className="inline" /> Works with different editors
                    </li>
                    <li>📽️ Works with video and audio</li>
                    <li>Preserves all effects applied</li>
                    <li>⚡ Extremenly fast</li>
                    <li>🦾 Lossless, no quality loss</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="mt-12 sm:mt-16 lg:mt-0">
              <div className="pl-4 -mr-48 sm:pl-6 md:-mr-16 lg:px-0 lg:m-0 lg:relative lg:h-full">
                <img
                  className="w-full rounded-xl shadow-xl ring-1 ring-black ring-opacity-5 lg:absolute lg:left-0 lg:h-full lg:w-auto lg:max-w-none"
                  src="/bigs2.png"
                  alt="Imitate user interface"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className=" py-8">
        <h2 className="text-3xl font-extrabold text-center tracking-tight mb-4">Download</h2>
        <div className="flex gap-12">
          <div className=" flex justify-center items-center flex-col">
            <img src="/icon.png" className="w-32" />
            <div className="font-bold text-center mt-2 text-xs">MediaChopper.app</div>
          </div>
          <div className="text-sm">
            <p>Current version: v1.0.1</p>
            <div className="flex gap-4">
              <Button className="my-2" icon={<FaDownload />}>
                Mac (Intel)
              </Button>
              <Button className="my-2" icon={<FaDownload />}>
                Mac (arm)
              </Button>
            </div>
            <div className="flex gap-4">
              <Button className="my-2" icon={<FaDownload />}>
                Windows (64-bit)
              </Button>
              <Button className="my-2" icon={<FaDownload />}>
                Windows (32-bit)
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className=" py-8">
        <h2 className="text-3xl font-extrabold text-center tracking-tight mb-4">Use Cases</h2>
        <ul className=" flex flex-col gap-1 list-inside list-disc text-gray-100 text-sm">
          <li>
            <strong>Stock Footage.</strong> Keep all different clips on the same timeline.
          </li>
          <li>
            <strong>Course Creation.</strong> Keep all video lessons on the same timeline. Apply audio effects to
            everything
          </li>
          <li>
            <strong>Custom Workflows.</strong> Export based on markers or segments.
          </li>
        </ul>

        {/* <div className=" flex justify-center pt-8 shadow-sm rounded-md">
          <button
            type="button"
            className={clsx(
              "relative inline-flex items-center px-4 py-2 rounded-l-md border",
              "border-gray-200  text-sm font-medium text-gray-200  ",
              showSeg ? "bg-gray-900 font-bold" : "bg-gray-700 hover:bg-gray-800"
              )}
              onClick={() => setShowSeg(true)}
          >
            Segments
          </button>
          <button
            type="button"
            className={clsx(
              "-ml-px ",
              "relative inline-flex items-center px-4 py-2 rounded-r-md border",
              "border-gray-200 text-sm font-medium text-gray-200  ",
              !showSeg ? "bg-gray-900 font-bold" : "bg-gray-700 hover:bg-gray-800"
              )}
              onClick={() => setShowSeg(false)}
          >
            Markers
          </button>
        </div> */}

        <div className="grid grid-cols-2 gap-8 my-16">
          <div>
            <div className="text-xl my-8 font-bold tracking-tight">Make this …</div>
            <img className="rounded border border-gray-400" src={`/comparer/this1seg.png`} />
            <div className="p-1 text-sm text-gray-300">DaVinci Resolve project with many segments</div>
          </div>
          <div>
            <div className="text-xl my-8 font-bold tracking-tight">… become this</div>
            <img className="rounded border border-gray-400" src={`/comparer/this2seg.png`} />
            <div className="p-1 text-sm text-gray-300">Splitted files with "clip" as basename</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 my-16">
          <div>
            <div className="text-xl my-8 font-bold tracking-tight">Make this …</div>
            <img className="rounded border border-gray-400" src={`/comparer/this1mar.png`} />
            <div className="p-1 text-sm text-gray-300">DaVinci Resolve project with many markers</div>
          </div>
          <div>
            <div className="text-xl my-8 font-bold tracking-tight">… become this</div>
            <img className="rounded border border-gray-400" src={`/comparer/this2mar.png`} />
            <div className="p-1 text-sm text-gray-300">Splitted files with marker names as filenames</div>
          </div>
        </div>
      </div>

      <div className=" py-8">
        <h2 className="text-3xl font-extrabold text-center tracking-tight mb-4">How does it work?</h2>
        <div>
          MediaChopper reads metadata files from your editor and split the output file based on your preferences.
        </div>
        <img src="/explanation.svg" className="w-full mx-auto bg-gray-800 rounded my-8 max-w-lg" />
      </div>

      <div className=" py-8">
        <h2 className="text-3xl font-extrabold text-center tracking-tight mb-4">Which programs does it work with?</h2>
        <div>
          Right now it only works with <strong>DaVinci Resolve</strong>, but we are working on adding more!
        </div>
      </div>
    </Layout>
  );
}
