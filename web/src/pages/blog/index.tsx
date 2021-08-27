import React from "react";
import { Layout } from "../../components/Layout";
import { Client } from "@notionhq/client";
import { getDatabase } from "../../utils/notion";
import Link from "next/link";
import { Text } from "./[post]";

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
              <Link href={`/blog/${post.id}`}>
                <a>
                  <Text text={post.properties.Name.title} />
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
