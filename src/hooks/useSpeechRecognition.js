/* global window */
import { createContext, useCallback, useRef, useState } from 'react';

// Setting Speech API values for webkit
let { SpeechRecognition, SpeechGrammarList } = window;
if (!SpeechRecognition && window.webkitSpeechRecognition) {
  SpeechRecognition = window.webkitSpeechRecognition;
}
if (!SpeechGrammarList && window.webkitSpeechGrammarList) {
  SpeechGrammarList = window.webkitSpeechGrammarList;
}

const useSpeechRecognition = ({ continuous = true } = {}) => {
  const [transcript, setTranscript] = useState('');
  const grammarList = new SpeechGrammarList();
  // Create a new SpeechRecognition context
  const recognition = useRef(new SpeechRecognition());
  // Set our transcript in the state
  recognition.current.addEventListener('result', (e) => {
    setTranscript(e.results[0][0].transcript);
  });

  const handleEnd = useCallback(() => {
    recognition.current.start();
  }, []);

  const start = () => {
    if (continuous) {
      recognition.current.addEventListener('end', handleEnd);
    }
    recognition.current.start();
  };

  const stop = () => {
    if (continuous) {
      recognition.current.removeEventListener('end', handleEnd);
    }
    recognition.current.stop();
  };

  return { grammarList, setTranscript, start, stop, transcript };
};

export default useSpeechRecognition;
