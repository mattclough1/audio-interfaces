/* global window */
import React, { useState, useEffect, useContext } from 'react';
import SpeechContext from '../../contexts/SpeechContext';
import './style.css';

let { SpeechRecognition } = window;

if (!SpeechRecognition && window.webkitSpeechRecognition) {
  SpeechRecognition = window.webkitSpeechRecognition;
}

const Prompter = ({ children, callbacks }) => {
  // const { speechTranscript, setSpeechTranscript } = useContext(SpeechContext);
  const [speechTranscript, setSpeechTranscript] = useState('');
  const [cursor, setCursor] = useState(0);
  const callbackMap = {};
  let script = children
    .reduce((acc, child) => {
      if (typeof child === 'string') {
        return [...acc, ...child.split(' ')];
      }
      if (child.props && child.props.callback && typeof child.props.children === 'string') {
        callbackMap[acc.length] = child.props.callback;
        return [...acc, ...child.props.children.split(' ')];
      }
    }, [])
    .join(' ')
    .replace(/\s[.,]/, '.')
    .split(' ')
    .filter((string) => string.length > 0);

  const speech = new SpeechRecognition();

  speech.addEventListener('result', (e) => {
    setSpeechTranscript(e.results[0][0].transcript);
  });

  speech.addEventListener('end', (e) => {
    speech.start();
  });

  useEffect(() => {
    console.log(speechTranscript);
    speechTranscript.split(' ').forEach((spokenWord) => {
      if (
        script[cursor] &&
        spokenWord.toLowerCase() === script[cursor].replace(/[.,]/, '').toLowerCase()
      ) {
        if (callbackMap[cursor]) {
          callbackMap[cursor]();
        }
        setSpeechTranscript((oldTranscript) =>
          oldTranscript
            .split(' ')
            .slice(1)
            .join(' '),
        );
        setCursor((currentCursor) => currentCursor + 1);
      }
    });
  });

  return (
    <div className="prompter">
      <span className="prompter__script--read">{script.slice(0, cursor).join(' ')}</span>{' '}
      <span className="prompter__script">{script.slice(cursor).join(' ')}</span>
      <button
        type="button"
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
