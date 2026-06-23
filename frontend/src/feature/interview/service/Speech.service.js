// services/speech.service.js
//
// Pure wrapper around the browser's Web Speech API (SpeechRecognition).
// No React, no state — just start/stop and callbacks.
// This is the ONLY file that knows about SpeechRecognition.

// ─── Browser compatibility check ─────────────────────────────────────────────

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

export const isSpeechSupported = () => Boolean(SpeechRecognition);

// ─── Factory function ─────────────────────────────────────────────────────────
// Returns a controller object { start, stop } for one recognition session.
// Call createSpeechService() each time you need a fresh session.
//
// Callbacks:
//   onTranscript(text)  — called continuously as the user speaks
//   onEnd()             — called when recognition stops (naturally or manually)
//   onError(message)    — called with a human-readable error string

export const createSpeechService = ({ onTranscript, onEnd, onError }) => {
  const recognition = new SpeechRecognition();

  // continuous = keep listening until stop() is called (not just one phrase)
  recognition.continuous = true;

  // interimResults = fire onTranscript with partial text while still speaking
  recognition.interimResults = true;

  recognition.lang = "en-US";

  // ── Event handlers ──────────────────────────────────────────────────────

  recognition.onresult = (event) => {
    // Build the full transcript from all results so far
    const transcript = Array.from(event.results)
      .map((result) => result[0].transcript)
      .join(" ")
      .trim();

    onTranscript(transcript);
  };

  recognition.onend = () => {
    onEnd();
  };

  recognition.onerror = (event) => {
    // Map browser error codes to messages a developer can act on
    const errorMessages = {
      "not-allowed":    "Microphone access was denied. Allow it in your browser settings.",
      "no-speech":      "No speech detected. Please try again.",
      "network":        "Network error during speech recognition.",
      "audio-capture":  "No microphone found. Plug one in and try again.",
      "aborted":        "Speech recognition was stopped.",
    };

    const message = errorMessages[event.error] || `Speech error: ${event.error}`;
    onError(message);
  };

  // ── Public API ────────────────────────────────────────────────────────────

  return {
    start: () => recognition.start(),
    stop:  () => recognition.stop(),
  };
};