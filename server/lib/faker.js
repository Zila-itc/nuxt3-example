import { faker } from "@faker-js/faker";
import { v4 as uuidv4 } from "uuid";

export const getUsers = (take) => {
  const users = [];

  const qty = +take > 10 ? 10 : +take;

  for (let index = 0; index < qty; index++) {
    const user = {};
    user.id = uuidv4();
    user.name = faker.name.findName();
    user.email = faker.internet.email();
    user.avatar = faker.image.avatar();

    users.push(user);
  }

  return users;
};

export const getWord = (length) => {
  return faker.word.verb(+length);
};

export const getVerbs = async (length) => {
  let words = new Set();
  const array = new Array(1000).fill(1);
  for await (const num of array) {
    const verb = faker.word.verb(+length);
    words.add(verb);
  }
  return [...words];
};

export const getAdverb = async (length) => {
  let words = new Set();
  const array = new Array(1000).fill(1);
  for await (const num of array) {
    const verb = faker.word.verb(+length);
    words.add(verb);
  }
  return [...words];
};

export const getNouns = async (length) => {
  let words = new Set();
  const array = new Array(1000).fill(1);
  for await (const num of array) {
    const verb = faker.word.noun(+length);
    words.add(verb);
  }
  return [...words];
};

export const getAdjectives = async (length) => {
  let words = new Set();
  const array = new Array(1000).fill(1);
  for await (const num of array) {
    const verb = faker.word.adjective(+length);
    words.add(verb);
  }
  return [...words];
};
