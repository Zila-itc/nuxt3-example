import { useQuery } from "h3";
import { queryByCollection, get } from "../../lib/firestore";

export default defineEventHandler(async (event) => {
  try {
    const query = useQuery(event.req);
    if (query.key !== "yroc") return "Nothing to see here!";
    const docs = await queryByCollection(query.col as string);
    
    // console.log(query)
    
    const doc = await get(query.col, query.id);
    return { doc: doc };
  } catch (error) {
    return { result: [], error: error.message };
  }
});
