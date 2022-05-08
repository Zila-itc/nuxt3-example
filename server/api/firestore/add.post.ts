import { useQuery, useBody } from "h3";
import { add } from "../../lib/firestore";

export default defineEventHandler(async (event) => {
  try {
    const query = useQuery(event.req);
    const body = await useBody(event.req);

    // console.log(query);

    if (query.ignore) return { id: "admin" };

    const docRef = await add(query.col as string, body);

    // console.log(docRef)

    return { id: docRef.id };
  } catch (error) {
    return { error: error.message };
  }
});
