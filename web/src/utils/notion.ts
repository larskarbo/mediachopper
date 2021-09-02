import { Client } from "@notionhq/client";
import forceEnv from "force-env"

const notion = new Client({
  auth: forceEnv("NOTION_TOKEN"),
});

const DB_ID = "5e0383030b774ca886b568a5111ad8c7";

export const getDatabase = async () => {
  const response = await notion.databases.query({
    database_id: DB_ID,
    filter: {
      property: "project",
      select: {
        equals: "MediaChopper",
      },
    },
  });
  return response.results;
};

export const getIdFromSlug = async (slug) => {
  const response = await notion.databases.query({
    database_id: DB_ID,
    filter: {
      and: [
        {
          property: "project",
          select: {
            equals: "MediaChopper",
          },
        },
        {
          property: "slug",
          text: {
            equals: slug,
          },
        },
      ],
    },
  });
  return response.results[0].id;
};

export const getPage = async (pageId) => {
  const response = await notion.pages.retrieve({ page_id: pageId });
  return response;
};

export const getBlocks = async (blockId) => {
  const response = await notion.blocks.children.list({
    block_id: blockId,
    page_size: 100,
  });
  return response.results;
};
