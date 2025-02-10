import { customFetch, url } from "./custom_fetch";

export const getAllUsers = customFetch(url.user.all, {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
})

export const createUser = async () => {
  return customFetch(url.user.all, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
}
