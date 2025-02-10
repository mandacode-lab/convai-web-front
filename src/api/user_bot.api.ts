import { customFetch, url } from "./custom_fetch";

export const getAllUserBots = async (userUuid: string) =>
  customFetch(`${url.userBot.all}?uid=${userUuid}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
