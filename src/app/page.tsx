"use client";

import { getAllUsers } from "@/api/user.api";
import { User } from "@/interfaces/user.interface";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [recording, setRecording] = useState(false);
  const [responseAudioUrl, setResponseAudioUrl] = useState("");
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const responseAudioRef = useRef<HTMLAudioElement | null>(null);

  const [allUsers, setAllUsers] = useState<User[]>([]);

  useEffect(() => {
    getAllUsers.then(async (res) => {
      const users = (await res.json()) as User[];
      setAllUsers(users);
    });
  }, []);

  const startAudioRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorderRef.current = mediaRecorder;
    audioChunksRef.current = [];

    mediaRecorder.ondataavailable = (e) => {
      audioChunksRef.current.push(e.data);
    };

    mediaRecorder.onstop = async () => {
      const audioBlob = new Blob(audioChunksRef.current, {
        type: "audio/ogg",
      });
      const audioUrl = URL.createObjectURL(audioBlob);

      // download audio
      const a = document.createElement("a");
      a.href = audioUrl;
      a.download = "audio.ogg";
      a.click();
      a.remove();

      const formData = new FormData();
      formData.append("file", audioBlob, "audio.ogg");

      try {
        // response is audio data
        const res = await fetch("http://localhost:3001/call/message", {
          method: "POST",
          body: formData,
        });

        const audioData = await res.blob();
        const responseAudioUrl = URL.createObjectURL(audioData);
        setResponseAudioUrl(responseAudioUrl);

        if (responseAudioRef.current) {
          responseAudioRef.current.pause();
          responseAudioRef.current.currentTime = 0;
        }

        setTimeout(() => {
          if (responseAudioRef.current) {
            responseAudioRef.current.src = responseAudioUrl;
            responseAudioRef.current.play();
          }
        }, 200);
      } catch (err) {
        console.error(err);
      }
    };

    mediaRecorder.start();
    setRecording(true);
  };

  const stopAudioRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setRecording(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      {allUsers.map((user) => (
        <div key={user.uuid} className="m-2">
          <p>{user.uuid}</p>
        </div>
      ))}
      {responseAudioUrl && (
        <audio
          ref={responseAudioRef}
          src={responseAudioUrl}
          controls
          className="mx-auto"
        />
      )}
      {recording ? (
        <button
          onClick={stopAudioRecording}
          className="bg-red-200 p-2 rounded-lg hover:bg-red-400"
        >
          stop recording
        </button>
      ) : (
        <button
          onClick={startAudioRecording}
          className="bg-green-200 p-2 rounded-lg hover:bg-green-400"
        >
          start recording
        </button>
      )}
    </div>
  );
}
