import React from "react";
import { Layout } from "../../components/Layout";
import { Client } from "@notionhq/client";
import { getDatabase } from "../../utils/notion";
import Link from "next/link";
import { NotionText } from "../../utils/NotionText";
export const getPlainText = (cell) => {
  if(cell?.type == "title"){
    return cell?.title?.[0]?.plain_text
  }
  return cell?.rich_text?.[0]?.plain_text || ""
}
export const getStaticProps = async () => {
  const database = await getDatabase();

  return {
    props: {
      posts: database,
    },
    revalidate: 1,
  };
};

export default function Blog({ posts }) {
  console.log('posts: ', posts);
  return (
    <Layout>
      <div>Posts</div>
      {posts.map((post) => {
        const date = new Date(post.last_edited_time).toLocaleString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        });
        return (
          <li key={post.id} className={""}>
            <h3 className={""}>
              <Link href={`/blog/${getPlainText(post.properties.slug)}`}>
                <a>
                  <NotionText text={post.properties.Name.title} />
                </a>
              </Link>
            </h3>

            <p className={""}>{date}</p>
            <Link href={`/${post.id}`}>
              <a> Read post →</a>
            </Link>
          </li>
        );
      })}
    </Layout>
  );
}
