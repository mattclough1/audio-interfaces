/* global window */
import React, { useState, useEffect, useContext } from 'react';
import SpeechContext from '../contexts/SpeechContext';

let { SpeechRecognition } = window;

if (!SpeechRecognition && window.webkitSpeechRecognition) {
  SpeechRecognition = window.webkitSpeechRecognition;
}

const Prompter = ({ children, callbacks }) => {
  const { speechTranscript } = useContext(SpeechContext);
  // const [speechTranscript, setTranscript] = useState('');
  const [cursor, setCursor] = useState(0);
  const callbackPattern = /\[(\w+)(?:\((.*)\))?\]/;
  const scriptWithCallbacks = children.split(/\s(?!'[^']+')/);
  const scriptNoCallbacks = scriptWithCallbacks.map((word) => word.replace(callbackPattern, ''));
  const speech = new SpeechRecognition();

  // speech.addEventListener('result', (e) => {
  //   setTranscript(e.results[0][0].transcript);
  // });

  // speech.addEventListener('end', (e) => {
  //   speech.start();
  // });

  useEffect(() => {
    speechTranscript.split(' ').forEach((spokenWord) => {
      console.log(scriptWithCallbacks[cursor]);
      if (
        scriptNoCallbacks[cursor] &&
        spokenWord.toLowerCase() === scriptNoCallbacks[cursor].replace(/[\.,]/, '').toLowerCase()
      ) {
        const callback = scriptWithCallbacks[cursor].match(callbackPattern);
        if (callback && callback[1]) {
          callbacks[callback[1]].apply(null, callback[2].replace(/'/g, '').split(','));
        }
        setCursor((currentCursor) => currentCursor + 1);
      }
    });
  });

  const display = scriptNoCallbacks.slice(0, cursor).join(' ');
  return (
    <div>
      {display}
      <button
        onClick={() => {
          speech.start();
        }}
      >
        Start Listening
      </button>
    </div>
  );
};

export default Prompter;
