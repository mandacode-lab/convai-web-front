import { User } from "@/interfaces/user.interface";
import { Stream } from "stream";

const baseUrl = "http://localhost:3001";
export const url = {
  user: {
    all: `${baseUrl}/user/all`,
    create: `${baseUrl}/user/create`,
  },
  bot: {
    all: `${baseUrl}/bot/all`,
  },
  userBot: {
    all: `${baseUrl}/ub/all`,
  },
  match: {
    random: `${baseUrl}/match/random`,
  },
  conv: {
    all: `${baseUrl}/conv/all`,
  },
  call: {
    start: `${baseUrl}/call/start`,
    talk: `${baseUrl}/call/talk`,
  },
};
export const customFetch = async (url: string, options?: RequestInit) => {
  return fetch(url, {
    ...options,
  });
};
