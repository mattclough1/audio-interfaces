import { node } from 'prop-types';
import React, { createContext } from 'react';

import { useSpeechRecognition } from '../hooks/useSpeechRecognition';

export const SpeechRecognitionContext = createContext({
  speechTranscript: '',
  setSpeechTranscript: () => {},
});

export const SpeechRecognitionProvider = ({ children }) => {
  const { recognition, setTranscript, transcript, grammarList } = useSpeechRecognition();

  return (
    <SpeechRecognitionContext.Provider
      value={{ recognition, setTranscript, transcript, grammarList }}
    >
      {children}
    </SpeechRecognitionContext.Provider>
  );
};

SpeechRecognitionProvider.propTypes = {
  children: node,
};

SpeechRecognitionProvider.defaultProps = {
  children: undefined,
};
