import { getAdjectives } from "../lib/faker";

export default defineEventHandler(async (event) => {
  const query = useQuery(event);

  const length = +query.length > 4 || +query.length < 2 ? 4 : +query.length;

  const words = await getAdjectives(length);
  console.log(words)
  return { words };
});
