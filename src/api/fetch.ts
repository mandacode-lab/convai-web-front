import axios from "axios";
import { Stream } from "stream";

const baseUrl = "http://localhost:3001";
const url = {
  call: {
    message: `${baseUrl}/call/message`,
  },
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
