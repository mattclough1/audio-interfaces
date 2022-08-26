import { createContext, useCallback, useEffect, useRef, useState } from 'react';

// Setting Speech API values for webkit
let { SpeechRecognition, SpeechGrammarList } = window;
if (!SpeechRecognition && window.webkitSpeechRecognition) {
  SpeechRecognition = window.webkitSpeechRecognition;
}
if (!SpeechGrammarList && window.webkitSpeechGrammarList) {
  SpeechGrammarList = window.webkitSpeechGrammarList;
}

export const useSpeechRecognition = ({ continuous = true } = {}) => {
  const [transcript, setTranscript] = useState('');
  const grammarList = new SpeechGrammarList();
  // Create a new SpeechRecognition context
  const recognition = useRef(new SpeechRecognition());

  useEffect(() => {
    // Set our transcript in the state
    recognition.current.continuous = true;
    recognition.current.interimResults = true;
    recognition.current.addEventListener('result', (e) => {
      setTranscript(
        Array.from(e.results)
          .map((result) => result[0].transcript.trim())
          .join(' '),
      );
    });
  }, []);

  const handleEnd = useCallback(() => {
    recognition.current.start();
  }, []);

  const start = useCallback(() => {
    if (continuous) {
      recognition.current.addEventListener('end', handleEnd);
    }
    recognition.current.start();
  }, []);

  const stop = useCallback(() => {
    if (continuous) {
      recognition.current.removeEventListener('end', handleEnd);
    }
    recognition.current.stop();
  }, []);

  return { grammarList, setTranscript, start, stop, transcript };
};
