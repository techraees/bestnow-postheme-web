"use client";

import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import voiceAssistantWave from "@/assets/gif/voice.gif";
import SubHeader from "@/components/navigation/SubHeader";
import TopSpacingWrapper from "@/components/top-spacing/TopSpacing";

declare global {
  interface Window {
    webkitSpeechRecognition: any;
    SpeechRecognition: any;
  }
}

type SpeechRecognition = any;
type SpeechRecognitionEvent = any;
type SpeechRecognitionErrorEvent = any;

type RecognitionStatus = "idle" | "listening";

const VoiceAssistantPage: React.FC = () => {
  const router = useRouter();

  const [status, setStatus] = useState<RecognitionStatus>("idle");
  const [transcript, setTranscript] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSupported, setIsSupported] = useState(true);

  const recognitionRef = useRef<SpeechRecognition | null>(null);

  // latest full text
  const transcriptRef = useRef("");
  // session start se pehle ka text (purana)
  const beforeSessionTextRef = useRef("");
  // stop mic button se aya tha? agar haan to search pe bhejna
  const navigateOnEndRef = useRef(false);

  useEffect(() => {
    const SpeechRecognitionCtor =
      typeof window !== "undefined" &&
      (window.SpeechRecognition || window.webkitSpeechRecognition);

    if (!SpeechRecognitionCtor) {
      setIsSupported(false);
      return;
    }

    const recognition = new SpeechRecognitionCtor();
    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = true;

    recognition.onstart = () => {
      setStatus("listening");
      setError(null);

      // is session se pehle ka pura text store kar lo
      beforeSessionTextRef.current = transcriptRef.current;
    };

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      // is session ka text (sirf abhi wala recording)
      let sessionText = "";
      for (let i = 0; i < event.results.length; i++) {
        sessionText += event.results[i][0].transcript;
      }

      const combined = `${beforeSessionTextRef.current} ${sessionText}`.trim();
      setTranscript(combined);
      transcriptRef.current = combined;
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      setError(event.error || "Something went wrong");
      setStatus("idle");
      navigateOnEndRef.current = false;
    };

    recognition.onend = () => {
      setStatus("idle");

      if (navigateOnEndRef.current) {
        navigateOnEndRef.current = false;
        const query = transcriptRef.current.trim();
        if (query) {
          router.push(`/search?query=${encodeURIComponent(query)}`);
        }
      }
    };

    recognitionRef.current = recognition;

    return () => {
      recognition.stop();
    };
  }, [router]);

  // Mic start – purana text ko rehne do (append behaviour)
  const handleStart = () => {
    if (!recognitionRef.current) return;
    setError(null);
    navigateOnEndRef.current = false;
    recognitionRef.current.start();
  };

  // Mic stop (yellow button) → search pe bhej do
  const handleStopAndNavigate = () => {
    if (!recognitionRef.current) return;
    navigateOnEndRef.current = true;
    recognitionRef.current.stop();
  };

  // X button → sirf clear + stop, koi navigation nahi
  const handleCancel = () => {
    if (!recognitionRef.current) return;

    navigateOnEndRef.current = false;
    recognitionRef.current.stop();

    setStatus("idle");
    setTranscript("");
    transcriptRef.current = "";
    beforeSessionTextRef.current = "";
    setError(null);
  };

  const showTranscript = status === "listening" || transcript.length > 0;

  return (
    <TopSpacingWrapper>
      <div className=" w-full bg-light_mode_color dark:bg-dark_mode_color ">
        <SubHeader title="Voice Assistant" />
        <div className="flex items-center justify-center">
          <div className="w-full max-w-md aspect-[9/16] bg-light_mode_color dark:bg-dark_mode_color  overflow-hidden relative ">
            {/* Wave GIF top center */}
            <div className="absolute inset-x-0 top-10 flex justify-center pointer-events-none">
              <div className="h-[300px] w-[400px]   bg-light_mode_color dark:bg-dark_mode_color">
                <img
                  src={voiceAssistantWave.src}
                  className="w-full h-full object-fill rounded-2xl"
                  alt="Wave"
                />
              </div>
            </div>

            {/* Transcript text */}
            <div className="absolute inset-x-8 bottom-60 text-center">
              {showTranscript ? (
                <p className="text-light_mode_text dark:text-dark_mode_text text-lg leading-relaxed font-medium">
                  {transcript || "Listening..."}
                </p>
              ) : (
                <p className="text-neutral-500 text-sm">
                  Tap the mic and start speaking
                </p>
              )}
            </div>

            {/* Error message */}
            {error && (
              <div className="absolute inset-x-8 bottom-36 text-center">
                <p className="text-xs text-red-400">{error}</p>
              </div>
            )}

            {/* Bottom controls */}
            <div className="absolute inset-x-0 bottom-10 flex items-center justify-center gap-10">
              {/* left icon agar chahiye to yahan add kar lena */}

              {/* Main mic button */}
              <button
                type="button"
                onClick={
                  status === "idle" ? handleStart : handleStopAndNavigate
                }
                disabled={!isSupported}
                className={`h-20 w-20 rounded-full flex items-center justify-center shadow-xl transition-all duration-200 ${
                  status === "listening"
                    ? "bg-yellow-300 scale-105 animate-pulse"
                    : "bg-yellow-300 hover:bg-yellow-200"
                } ${!isSupported ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                {status === "listening" ? (
                  <div className="flex items-end gap-1">
                    <span className="w-1 h-4 bg-black rounded-full animate-[bounce_0.8s_infinite_0s]" />
                    <span className="w-1 h-6 bg-black rounded-full animate-[bounce_0.8s_infinite_0.15s]" />
                    <span className="w-1 h-3 bg-black rounded-full animate-[bounce_0.8s_infinite_0.3s]" />
                  </div>
                ) : (
                  <svg
                    viewBox="0 0 24 24"
                    className="w-8 h-8 text-black"
                    fill="currentColor"
                  >
                    <path d="M12 14a3 3 0 0 0 3-3V6a3 3 0 0 0-6 0v5a3 3 0 0 0 3 3z" />
                    <path d="M19 11a1 1 0 1 0-2 0 5 5 0 0 1-10 0 1 1 0 0 0-2 0 7 7 0 0 0 6 6.92V20H8a1 1 0 0 0 0 2h8a1 1 0 1 0 0-2h-3v-2.08A7 7 0 0 0 19 11z" />
                  </svg>
                )}
              </button>

              {/* Cancel / clear button */}
              <button
                type="button"
                onClick={handleCancel}
                className="h-12 w-12 rounded-full bg-neutral-900 flex items-center justify-center text-red-400 text-xl"
              >
                ✕
              </button>
            </div>

            {!isSupported && (
              <div className="absolute inset-x-6 bottom-4 text-center text-xs text-neutral-400">
                Your browser does not support speech recognition. Please use
                Chrome/Edge on desktop or Android.
              </div>
            )}
          </div>
        </div>
      </div>
    </TopSpacingWrapper>
  );
};

export default VoiceAssistantPage;
