import { customFetch, url } from "./custom_fetch";

export const getAllBots = customFetch(url.bot.all, {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
});
