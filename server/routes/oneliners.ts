import { useQuery } from "h3";
// import { queryByCollection } from "../lib/firestore";
import { oneLiners } from "../lib/oneliners";

export default defineEventHandler(async (event) => {
  try {
    const query = useQuery(event.req);
    const take = +query.take > 1 ? 1 : +query.take;
    const col = "oneliners";
    // const docs = await queryByCollection(col as string);

    const sentences = [];
    if (oneLiners.length > 0) {
      for (let index = 0; index < take; index++) {
        let item = "";
        do {
          item =
          oneLiners[
              Math.floor(Math.random() * oneLiners.length)
            ];
        } while (sentences.includes(item));

        sentences.push(item);
      }

      return sentences;
    } else {
      return "Nothing here.";
    }
  } catch (error) {
    console.log(error.message);
    return { result: [], error: error.message };
  }
});