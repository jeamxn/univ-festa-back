import Elysia, { t } from "elysia";
import mongoose from "mongoose";

import { IDocument } from "@/utils/db";

export interface DGuests {
  id: string;
  name: string;
  cover: string;
  icon: string;
  url: string;
}
export type IGuests = IDocument<DGuests>;

export const guestsElysiaSchema = t.Object({
  id: t.String(),
  name: t.String(),
  cover: t.String(),
  icon: t.String(),
  url: t.String(),
});

const guestsSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  cover: {
    type: String,
  },
  icon: {
    type: String,
  },
  url: {
    type: String,
  },
});
export const GuestsDB = mongoose.model<IGuests>("Guests", guestsSchema);

const GuestsModel = new Elysia()
  .decorate("guestsModel", {
    db: GuestsDB,
  });

export default GuestsModel;
