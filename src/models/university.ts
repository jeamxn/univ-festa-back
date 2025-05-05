import Elysia, { t } from "elysia";
import mongoose from "mongoose";

import { IDocument } from "@/utils/db";

export interface DUniversity {
  id: string;
  name: string;
  icon: string;
}
export type IUniversity = IDocument<DUniversity>;

export const universityElysiaSchema = t.Object({
  id: t.String(),
  name: t.String(),
  icon: t.String(),
});

const universitySchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
  },
});
export const UniversityDB = mongoose.model<IUniversity>("University", universitySchema);

const UniversityModel = new Elysia()
  .decorate("universityModel", {
    db: UniversityDB,
  });

export default UniversityModel;
