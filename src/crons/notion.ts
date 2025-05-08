/* eslint-disable @typescript-eslint/no-explicit-any */
import cron, { Patterns } from "@elysiajs/cron";
import dayjs from "dayjs";

import { CalendarDB } from "@/models/calendar";
import { DGuests, GuestsDB } from "@/models/guests";
import { UniversityDB } from "@/models/university";
import { client, databases } from "@/utils/notion";

export const run = async () => {
  try {
    console.log("🐩 Notion start at:", dayjs().format("YYYY-MM-DD HH:mm:ss"));

    const guests_notion = await client.databases.query({
      database_id: databases.guests,
    });
    const guests: DGuests[] = guests_notion.results.map((i: any) => {
      return {
        id: i.id,
        name: i.properties["이름"].title[0].text.content,
        cover: i.cover?.file.url ?? "",
        icon: i.icon?.file.url  ?? "",
        url: i.properties["나무위키"].url ?? ""
      };
    });
    await GuestsDB.deleteMany({});
    await GuestsDB.insertMany(guests);
    // const guests_obj = Object.fromEntries(guests.map(g => [g.id, g]));

    const univ_notion = await client.databases.query({
      database_id: databases.university,
    });
    const univ = univ_notion.results.map((i: any) => {
      return {
        id: i.id,
        name: i.properties["이름"].title[0].text.content,
        icon: i.icon.custom_emoji?.url ?? "",
      };
    });
    await UniversityDB.deleteMany({});
    await UniversityDB.insertMany(univ);
    // const univ_obj = Object.fromEntries(univ.map(u => [u.id, u]));

    const calendar_notion = await client.databases.query({
      database_id: databases.calendar,
    });
    const calendar = calendar_notion.results.map((i: any) => {
      return {
        id: i.id,
        title: i.properties["이름"].title[0].text.content,
        date: i.properties["날짜"].date.start,
        icon: i.icon.custom_emoji?.url ?? "",
        university: i.properties["주최 대학교"].relation[0].id,
        // university: univ_obj[i.properties["주최 대학교"].relation[0].id],
        guests: i.properties["게스트 목록"].relation.map((j: any) => j.id) ?? [],
        // guests: i.properties["게스트 목록"].relation.map((j: any) => guests_obj[j.id]) ?? [],
      };
    });
    await CalendarDB.deleteMany({});
    await CalendarDB.insertMany(calendar);
    // console.log(cal);

    console.log("🐩 Notion done at:", dayjs().format("YYYY-MM-DD HH:mm:ss"));
  }
  catch (e) {
    console.error(e);
    console.error("🐩 Notion error at:", dayjs().format("YYYY-MM-DD HH:mm:ss"));
  }
};

// setTimeout(() => {
//   run();
// }, 1000);

const Cron_notion = cron({
  name: "cron_notion",
  pattern: Patterns.EVERY_30_MINUTES,
  run: run,
});

export default Cron_notion;
