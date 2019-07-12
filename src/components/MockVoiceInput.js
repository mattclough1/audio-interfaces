import React, { useContext } from 'react';
import SpeechContext from '../contexts/SpeechContext';

let timer = null;

const MockVoiceInput = () => {
  const { setSpeechTranscript } = useContext(SpeechContext);

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
          setSpeechTranscript(target.value);
          target.value = '';
        }, 500);
      }}
    />
  );
};

export default MockVoiceInput;
