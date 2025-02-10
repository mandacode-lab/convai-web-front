import { customFetch, url } from "./custom_fetch";

export const matchRandom = (userUuid: string) => {
  return customFetch(`${url.match.random}?uid=${userUuid}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};
