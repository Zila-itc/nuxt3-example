import { useQuery } from "h3";
import { queryByCollection } from "../../lib/firestore";

export default defineEventHandler(async (event) => {
  try {
    const query = useQuery(event.req);
    if (query.key !== "yroc") return "Nothing to see here!";
    // const docs = await queryByCollection(query.col as string);

    return { stats: "No stats yet"}
  } catch (error) {
    return { result: [], error: error.message };
  }
});
