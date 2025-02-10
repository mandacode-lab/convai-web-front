import { customFetch, url } from "./custom_fetch";

export const startCall = (
  userUuid: string,
  botUuid: string,
  convUuid: string,
) => {
  return customFetch(
    `${url.call.start}?uid=${userUuid}&bid=${botUuid}&cid=${convUuid}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
};

export const talk = (
  userUuid: string,
  botUuid: string,
  convUuid: string,
  audio: Blob,
) => {
  const formData = new FormData();
  formData.append("file", audio);
  return customFetch(
    `${url.call.talk}?uid=${userUuid}&bid=${botUuid}&cid=${convUuid}`,
    {
      method: "POST",
      body: formData,
    },
  );
};
