import { Client } from "@notionhq/client";

export const client = new Client({
  auth: process.env.NOTION_API_KEY,
});

export const databases = {
  university: process.env.NOTION_DATABASE_ID_UNIVERSITY ?? "",
  calendar: process.env.NOTION_DATABASE_ID_CALENDAR ?? "",
  guests: process.env.NOTION_DATABASE_ID_GUESTS ?? "",
};
