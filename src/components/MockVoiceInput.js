import React, { useContext } from 'react';

import { SpeechRecognitionContext } from '../contexts/SpeechRecognitionContext';

let timer = null;

export const MockVoiceInput = () => {
  const { setTranscript } = useContext(SpeechRecognitionContext);

  return (
    <input
      className="input"
      type="text"
      onInput={(e) => {
        const { target } = e;
        if (timer) {
          clearTimeout(timer);
          timer = null;
        }
        timer = setTimeout(() => {
          setTranscript(target.value);
          target.value = '';
        }, 500);
      }}
    />
  );
};
