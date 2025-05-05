import Elysia, { t } from "elysia";

import UniversityModel, { universityElysiaSchema } from "@/models/university";
import { errorElysia } from "@/utils/error";

const university = new Elysia().use(UniversityModel).get(
  "university",
  async ({
    universityModel,
  }) => {
    const data = await universityModel.db.find({}, { _id: 0, __v: 0 }).sort({ name: 1 });
    return data;
  },
  {
    response: {
      200: t.Array(universityElysiaSchema),
      ...errorElysia(["NOT_FOUNDED_KEY"]),
    },
  },
);

export default university;
