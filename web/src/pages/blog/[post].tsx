/* eslint-disable no-case-declarations */
import Link from "next/link";
import React, { Fragment } from "react";
import { getPlainText } from ".";
import { Layout } from "../../components/Layout";
import { getBlocks, getDatabase, getIdFromSlug, getPage } from "../../utils/notion";
import { NotionText, renderBlock } from "../../utils/NotionText";
import { QuickSeo } from "next-quick-seo";
export default function Post({ page, blocks, id }) {
  console.log("id: ", id);
  return (
    <Layout>
      <QuickSeo title={page.properties.Name.title[0].plain_text} />

      <article className={"w-full"}>
        <h1 className={""}>
          <NotionText text={page.properties.Name.title} />
        </h1>
        <section>
          {blocks.map((block) => (
            <Fragment key={block.id}>{renderBlock(block)}</Fragment>
          ))}
          <Link href="/">
            <a className={""}>← Go home</a>
          </Link>
        </section>
      </article>
    </Layout>
  );
}

export const getStaticPaths = async () => {
  const database = await getDatabase();
  return {
    paths: database.map((page) => ({ params: { post: getPlainText(page.properties.slug) } })),
    fallback: true,
  };
};

export const getStaticProps = async (context) => {
  const { post } = context.params;

  const id = await getIdFromSlug(post);
  const page = await getPage(id);
  const blocks = await getBlocks(id);

  // Retrieve block children for nested blocks (one level deep), for example toggle blocks
  // https://developers.notion.com/docs/working-with-page-content#reading-nested-blocks
  const childBlocks = await Promise.all(
    blocks
      .filter((block) => block.has_children)
      .map(async (block) => {
        return {
          id: block.id,
          children: await getBlocks(block.id),
        };
      })
  );
  const blocksWithChildren = blocks.map((block) => {
    // Add child blocks if the block should contain children but none exists
    if (block.has_children && !block[block.type].children) {
      block[block.type]["children"] = childBlocks.find((x) => x.id === block.id)?.children;
    }
    return block;
  });

  return {
    props: {
      page,
      blocks: blocksWithChildren,
    },
    revalidate: 1,
  };
};
