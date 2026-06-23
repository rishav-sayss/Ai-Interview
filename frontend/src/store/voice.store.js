// store/voice.store.js
//
// Zustand store — owns all voice-related state.
// The hook reads from here. The page never touches this directly.
//
// Install: npm i zustand

import { create } from "zustand";

export const useVoiceStore = create((set) => ({
  // ── State ───────────────────────────────────────────────────────────────
  isListening:  false,   // is the mic active right now?
  transcript:   "",      // live text coming from the microphone
  voiceError:   null,    // string | null — last error message

  // ── Actions ─────────────────────────────────────────────────────────────
  setListening:  (value)   => set({ isListening: value }),
  setTranscript: (text)    => set({ transcript: text }),
  setVoiceError: (message) => set({ voiceError: message }),
  clearVoice:    ()        => set({ isListening: false, transcript: "", voiceError: null }),
}));