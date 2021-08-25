import { Layout } from "../components/Layout";
import SEO from "../components/Seo";

export default function Index() {
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

    </Layout>
  );
}
