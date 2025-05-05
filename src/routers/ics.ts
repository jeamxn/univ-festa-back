import Elysia from "elysia";
import { createEvents, EventAttributes } from "ics";

import CalendarModel from "@/models/calendar";
import { errorElysia } from "@/utils/error";

const ics = new Elysia().use(CalendarModel).get(
  "ics",
  async ({
    calendarModel,
    set
  }) => {
    const data = await calendarModel.getJoinedCalendar();

    const events = data.map((item): EventAttributes => ({
      start: item.date.split("-").map(Number) as [number, number, number],
      duration: { hours: 12 },
      title: item.title,
      description: `학교: ${item.university.name}\n게스트: ${item.guests.map(g => g.name).join(", ")}`,
      location: item.university.name,
      url: `https://jeamxn.notion.site/1-${(item.id as string).replaceAll("-", "")}`,
      status: "CONFIRMED"
    }));
    const { value } = createEvents(events);

    set.headers["Content-Type"] = "text/calendar";
    set.headers["Content-Disposition"] = "attachment; filename=calendar.ics";

    return value;
  },
  {
    response: {
      ...errorElysia(["NOT_FOUNDED_KEY"]),
    },
  },
);

export default ics;
