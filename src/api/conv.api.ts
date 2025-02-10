import { customFetch, url } from "./custom_fetch";

export const getAllConv = async (userUuid: string, botUuid: string) =>
  customFetch(`${url.conv.all}?uid=${userUuid}&bid=${botUuid}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
