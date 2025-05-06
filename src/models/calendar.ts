import Elysia, { t } from "elysia";
import mongoose from "mongoose";

import { DGuests, guestsElysiaSchema } from "./guests";
import { DUniversity, universityElysiaSchema } from "./university";

import { IDocument } from "@/utils/db";

export interface DCalendar {
  id: string;
  title: string;
  date: string;
  icon: string;
  university: DUniversity["id"];
  guests: DGuests["id"][];
}
export type ICalendar = IDocument<DCalendar>;
export type JoinedCalendar = {
  id: string;
  title: string;
  date: string;
  icon: string;
  university: DUniversity;
  guests: DGuests[];
}

export const calendarElysiaSchema = t.Object({
  id: t.String(),
  title: t.String(),
  date: t.String(),
  icon: t.String(),
  university: t.String(),
  guests: t.Array(t.String()),
});

export const joinedCalendarElysiaSchema = t.Object({
  id: t.String(),
  title: t.String(),
  date: t.String(),
  icon: t.String(),
  university: universityElysiaSchema,
  guests: t.Array(guestsElysiaSchema),
});

const calendarSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
  },
  university: {
    type: String,
  },
  guests: {
    type: [String],
  },
});
export const CalendarDB = mongoose.model<ICalendar>("Calendar", calendarSchema);

const getJoinedCalendar = () => {
  return CalendarDB.aggregate<JoinedCalendar>([
    {
      $lookup: {
        from: "universities",
        localField: "university",
        foreignField: "id",
        as: "university"
      }
    },
    {
      $unwind: "$university"
    },
    {
      $lookup: {
        from: "guests",
        localField: "guests",
        foreignField: "id",
        as: "guests"
      }
    },
    {
      $project: {
        _id: 0,
        __v: 0,
        "university.__v": 0,
        "guests.__v": 0,
        "university._id": 0,
        "guests._id": 0
      }
    }
  ]).sort({ date: 1, title: 1 });
};

const CalendarModel = new Elysia()
  .decorate("calendarModel", {
    db: CalendarDB,
    getJoinedCalendar,
  });

export default CalendarModel;
