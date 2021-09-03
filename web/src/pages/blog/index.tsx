import { getStaticPropsList, PostList } from "@larskarbo/cms-tools";
import React from "react";
import { Layout } from "../../components/Layout";

export const getStaticProps = getStaticPropsList;

export default function Blog({ posts }) {
  return (
    <Layout>
      <PostList posts={posts} />
    </Layout>
  );
}
