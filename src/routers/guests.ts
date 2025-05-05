import Elysia, { t } from "elysia";

import GuestsModel, { guestsElysiaSchema } from "@/models/guests";
import { errorElysia } from "@/utils/error";

const guests = new Elysia().use(GuestsModel).get(
  "guests",
  async ({
    guestsModel,
  }) => {
    const data = await guestsModel.db.find({}, { _id: 0, __v: 0 }).sort({ name: 1 });
    return data;
  },
  {
    response: {
      200: t.Array(guestsElysiaSchema),
      ...errorElysia(["NOT_FOUNDED_KEY"]),
    },
  },
);

export default guests;
