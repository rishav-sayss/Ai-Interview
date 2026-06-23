// hooks/useVoice.hook.js
//
// Bridges the speech service (browser API) and the voice store (Zustand).
// The page calls ONE hook and gets everything it needs.
// No speech logic lives in the page. No store calls live in the page.
//
// Usage:
//   const { isListening, voiceError, toggleVoice, isSupported } = useVoice(onTranscript);
//
//   onTranscript(text) — callback fired whenever new speech text arrives.
//   The hook appends the live transcript to whatever text is already in the field.

import { useRef } from "react";
import { useVoiceStore }       from "../store/voice.store";
import { createSpeechService, isSpeechSupported } from "../services/speech.service";

export const useVoice = (onTranscript) => {
  // Read state and actions from the store
  const { isListening, voiceError, setListening, setTranscript, setVoiceError, clearVoice } =
    useVoiceStore();

  // Hold the recognition controller between renders (not state — no re-render needed)
  const serviceRef = useRef(null);

  // ── Start listening ───────────────────────────────────────────────────────
  const startListening = () => {
    setVoiceError(null);
    setTranscript("");

    serviceRef.current = createSpeechService({
      // Called continuously while the user speaks
      onTranscript: (liveText) => {
        setTranscript(liveText);
        onTranscript(liveText); // push live text into the answer field
      },

      // Called when recognition ends (naturally or via stop())
      onEnd: () => {
        setListening(false);
      },

      // Called on any microphone or network error
      onError: (message) => {
        setVoiceError(message);
        setListening(false);
      },
    });

    serviceRef.current.start();
    setListening(true);
  };

  // ── Stop listening ────────────────────────────────────────────────────────
  const stopListening = () => {
    serviceRef.current?.stop();
    setListening(false);
  };

  // ── Toggle (what the mic button calls) ───────────────────────────────────
  const toggleVoice = () => {
    if (!isSpeechSupported()) {
      setVoiceError("Your browser doesn't support voice input. Try Chrome or Edge.");
      return;
    }
    isListening ? stopListening() : startListening();
  };

  // ── Reset (call on question change to clear the live transcript) ─────────
  const resetVoice = () => clearVoice();

  return {
    isListening,          // boolean — is mic active?
    voiceError,           // string | null — show in UI if set
    isSupported: isSpeechSupported(), // boolean — hide mic button if false
    toggleVoice,          // call on mic button click
    resetVoice,           // call when moving to the next question
  };
};