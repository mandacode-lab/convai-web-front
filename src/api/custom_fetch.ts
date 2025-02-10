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
export const callMessage = async (
  audioBlob: Blob,
  uid: string,
  bid: string,
  cid: string,
) => {
  const formData = new FormData();
  formData.append("file", audioBlob, "audio.wav");

  try {
    // response is audio data audio/ogg
    const res = await axios<Stream>({
      url: url.call.message,
      params: {
        uid,
        bid,
        cid,
      },
      method: "POST",
      data: formData,
      responseType: "stream",
    });

    return res.data;
  } catch (e) {
    console.error(e);
  }
};
export const getAllUsers = axios<User[]>({
  url: url.user.all,
  method: "GET",
  responseType: "json",
});
export const createUser = axios<User>({
  url: url.user.all,
  method: "POST",
  responseType: "json",
});
