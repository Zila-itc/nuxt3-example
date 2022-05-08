import { getWord } from "../lib/faker";

export default defineEventHandler((event) => {
  const query = useQuery(event);

  const length = +query.length > 4 || +query.length < 2 ? 4 : +query.length;

  const word = getWord(length)

  return { word };
});