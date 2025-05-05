import cors from "@elysiajs/cors";
import { swagger } from "@elysiajs/swagger";
import Bun from "bun";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { Elysia } from "elysia";
import mongoose from "mongoose";

import Crons from "./crons";
import IndexRouter from "./routers";

dayjs.extend(utc);
dayjs.extend(timezone);

mongoose.connect(Bun.env.MONGODB_URI ?? "");
const db = mongoose.connection;

const mongodb = new URL(Bun.env.MONGODB_URI ?? "");
db.on("open", console.log.bind(console, `💽 MongoDB connected to ${mongodb.hostname}:${mongodb.port}`));
db.on("error", console.error.bind(console, "MongoDB connection error:"));

const app = new Elysia();

if (Bun.env.NODE_ENV === "development") { 
  app.use(swagger());
}

app.use(
  cors({
    origin: true,
  }),
);
app.use(Crons);
app.use(IndexRouter);
app.onError(({ error, code }) => {
  if (code === "NOT_FOUND") return;
  console.error(error);
});

app.listen(8000);

console.log(`🕑 Reloaded at ${dayjs().format("YYYY-MM-DD HH:mm:ss.SSS")}`);
console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);
