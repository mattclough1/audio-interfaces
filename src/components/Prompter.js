/* global window */
import React, { useState, useEffect, useRef, useContext } from 'react';
import SpeechContext from '../contexts/SpeechContext';
import './Prompter.css';

// Setting Speech API values for webkit
let { SpeechRecognition, SpeechGrammarList } = window;
if (!SpeechRecognition && window.webkitSpeechRecognition) {
  SpeechRecognition = window.webkitSpeechRecognition;
}
if (!SpeechGrammarList && window.webkitSpeechGrammarList) {
  SpeechGrammarList = window.webkitSpeechGrammarList;
}

const Prompter = ({ children }) => {
  const [speechTranscript, setSpeechTranscript] = useState('');
  // Comment the above line and uncomment the below line for mocking voice input
  // const { speechTranscript, setSpeechTranscript } = useContext(SpeechContext);

  // Current read cursor, starting at 0 obviously
  const [cursor, setCursor] = useState(0);

  // Split all the children into an array of one word or react element per item
  const script = children
    .map((item) => (typeof item === 'string' ? item.split(' ') : item))
    .flat()
    .filter((item) => (typeof item === 'string' && item.length > 0) || item);

  // Add words to grammar list
  const speechGrammarList = new SpeechGrammarList();
  script.forEach((item) => {
    if (typeof item === 'string') {
      speechGrammarList.addFromString(item.replace(/[.,]/, ''), 1);
    } else if (React.isValidElement(item)) {
      speechGrammarList.addFromString(item.props.children.replace(/[,.]/, ''), 1);
    }
  });

  // Create a new SpeechRecognition context
  const speech = new SpeechRecognition({ grammars: speechGrammarList });
  // Set our transcript in the state
  speech.addEventListener('result', (e) => {
    setSpeechTranscript(e.results[0][0].transcript);
  });
  // Keep listening
  speech.addEventListener('end', (e) => {
    speech.start();
  });
  // Whenever the speech transcript updates, let's analyze it and see if we hit any words in the script
  useEffect(() => {
    speechTranscript.split(' ').forEach((spokenWord) => {
      // Get the word in the script at our current cursor point
      let scriptWord = script[cursor];
      if (scriptWord) {
        // If the word in the script is in a Cue, set the scriptWord to the Cue's children
        if (React.isValidElement(scriptWord)) {
          scriptWord = scriptWord.props.children;
        }
        // If the spoken word matches our script word, remove the word from our speech transcript and move the cursor
        // which will cause useEffect to run again and analyze the next word
        // I'm 90% sure this can be done in an easier way
        if (spokenWord.toLowerCase() === scriptWord.replace(/[.,]/, '').toLowerCase()) {
          setSpeechTranscript((oldTranscript) =>
            oldTranscript
              .split(' ')
              .slice(1)
              .join(' '),
          );
          setCursor((currentCursor) => currentCursor + 1);
        }
      }
    });
  });
  // Add spaces to our script array so we can keep our Cues but also render spaces between words
  const renderedScript = script.map((item, ix) => (ix !== 0 ? [' ', item] : item)).flat();

  // Scroll the cursor point to the middle of the window as we progress
  const readElement = useRef(null);
  if (
    readElement.current &&
    readElement.current.getBoundingClientRect().bottom > window.innerHeight / 2
  ) {
    window.scroll({
      left: 0,
      top:
        readElement.current.getBoundingClientRect().bottom -
        window.innerHeight / 2 +
        window.scrollY,
      behavior: 'smooth',
    });
  }

  return (
    <div className="prompter">
      <div className="prompter__script">
        <span className="prompter__read-script" ref={readElement}>
          {/* Need to multiply the cursor by 2 to account for the spaces we added */}
          {renderedScript.slice(0, cursor * 2)}
        </span>{' '}
        <span className="prompter__unread-script">
          {renderedScript
            .slice(cursor * 2)
            .map((item) => (React.isValidElement(item) ? item.props.children : item))}
        </span>
      </div>
      <div className="prompter__control-wrapper">
        <div className="prompter__controls">
          <button
            className="prompter__button"
            type="button"
            onClick={() => {
              speech.start();
            }}
          >
            Start Listening
          </button>
        </div>
      </div>
    </div>
  );
};

export default Prompter;
