import Elysia, { t } from "elysia";

import CalendarModel, { joinedCalendarElysiaSchema } from "@/models/calendar";
import { errorElysia } from "@/utils/error";

const calender = new Elysia().use(CalendarModel).get(
  "calendar",
  async ({
    calendarModel,
  }) => {
    const data = await calendarModel.getJoinedCalendar();
    return data;
  },
  {
    response: {
      200: t.Array(joinedCalendarElysiaSchema),
      ...errorElysia(["NOT_FOUNDED_KEY"]),
    },
  },
);

export default calender;
