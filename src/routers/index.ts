import Elysia from "elysia";

import calender from "./calendar";
import guests from "./guests";
import ics from "./ics";
import university from "./university";

const IndexRouter = new Elysia({
  name: "Index",
  prefix: "",
})
  .use(calender)
  .use(university)
  .use(guests)
  .use(ics);

export default IndexRouter;
