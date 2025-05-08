import Elysia from "elysia";

import calender from "./calendar";
import guests from "./guests";
import ics from "./ics";
import run from "./run";
import university from "./university";

const IndexRouter = new Elysia({
  name: "Index",
  prefix: "",
})
  .use(calender)
  .use(university)
  .use(guests)
  .use(run)
  .use(ics);

export default IndexRouter;
