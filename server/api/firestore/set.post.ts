import { useQuery, useBody } from "h3";
import { set } from "../../lib/firestore";

export default defineEventHandler(async (event) => {
  try {
    const query = useQuery(event.req);
    const body = await useBody(event.req);

    // console.log(query, body)

    const docRef = await set(query.col as string, body);

    return;
  } catch (error) {
    return { error: error.message };
  }
});
