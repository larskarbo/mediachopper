/* eslint-disable no-case-declarations */
import { Article, getStaticPathsPost, getStaticPropsPost } from "@larskarbo/cms-tools";
import React from "react";
import { Layout } from "../../components/Layout";

export default function Post({ articleData }) {
  return (
    <Layout>
      <Article
        articleData={articleData}
      />
    </Layout>
  );
}

export const getStaticPaths = getStaticPathsPost;

export const getStaticProps = getStaticPropsPost;
