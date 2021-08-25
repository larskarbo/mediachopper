import MemoResolveIcon from "../components/icons/ResolveIcons";
import { Layout } from "../components/Layout";
import SEO from "../components/Seo";

export default function Index() {
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
        <h2 className="text-3xl font-extrabold text-center tracking-tight mb-4">Use Cases</h2>
        <ul className=" flex flex-col gap-1 list-inside list-disc text-gray-100 text-sm">
          <li><strong>Stock Footage.</strong> Keep all different clips on the same timeline.</li>
          <li><strong>Course Creation.</strong> Keep all video lessons on the same timeline. Apply audio effects to everything</li>
          <li><strong>Custom Workflows.</strong> Export based on markers or segments.</li>
        </ul>

        <div className="grid grid-cols-2">
          <div>
            <div>Make this...</div>
            <img src="/comparer/this1seg.png" />
          </div>
          <div>
            <div>...become this</div>
            {/* <img src="/comparer/this1seg.png" /> */}

          </div>
        </div>
      </div>


      <div className=" py-8">
        <h2 className="text-3xl font-extrabold text-center tracking-tight mb-4">How does it work?</h2>
        <ul className=" flex flex-col gap-1 list-inside list-disc text-gray-100 text-sm">
          <li><strong>Stock footage.</strong> Keep all different clips on the same timeline.</li>
          <li><strong>Course creation.</strong> Keep all video lessons on the same timeline. Apply audio effects to everything</li>
          <li>Export based on markers.</li>
        </ul>
      </div>
      <img src="/explanation.svg" className="w-full bg-gray-800 rounded my-8 max-w-lg" />
      <div className="text-center px-4 py-24 flex flex-col items-center">
        Hey! MediaChopper is a video editing platform that allows you to export individual clips from Davinci Resolve.
      </div>
    </Layout>
  );
}
