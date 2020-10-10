/* global window */
import { createContext, useState } from 'react';

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
  const recognition = new SpeechRecognition();
  // Set our transcript in the state
  recognition.addEventListener('result', (e) => {
    setTranscript(e.results[0][0].transcript);
  });
  if (continuous) {
    // Keep listening
    recognition.addEventListener('end', () => {
      recognition.start();
    });
  }
  return { grammarList, recognition, setTranscript, transcript };
};

export default useSpeechRecognition;
