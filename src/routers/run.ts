import Bun from "bun";
import Elysia, { t } from "elysia";

import { run as runReloadNotion } from "@/crons/notion";
import { errorElysia } from "@/utils/error";

const run = new Elysia().get(
  "run",
  async ({
    query
  }) => {
    if(query.key !== Bun.env.RUN_KEY) return false;
    await runReloadNotion();
    return true;
  },
  {
    query: t.Object({
      key: t.String(),
    }),
    response: {
      200: t.Boolean(),
      ...errorElysia(["NOT_FOUNDED_KEY"]),
    },
  },
);

export default run;
