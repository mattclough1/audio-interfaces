import { createContext } from 'react';

const SpeechContext = createContext({
  speechTranscript: '',
  setSpeechTranscript: () => {},
});

export default SpeechContext;
