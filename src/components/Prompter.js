import './Prompter.css';

import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';

import { SpeechRecognitionContext } from '../contexts/SpeechRecognitionContext';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';

const removePunc = (string) =>
  string
    .replace(/[,.?!—]/, '')
    .replace(/[\u2018\u2019\u201C\u201D]/g, (c) =>
      '\'\'""'.substring(
        '\u2018\u2019\u201C\u201D'.indexOf(c),
        '\u2018\u2019\u201C\u201D'.indexOf(c) + 1,
      ),
    );
const removeSpacesBetweenPunc = (words) =>
  words.filter(
    (word, ix) =>
      !(word === ' ' && (/^[,.?!\-–—]$/.test(words[ix + 1]) || /[—]$/.test(words[ix - 1]))),
  );

export const Prompter = ({ children, linkShowing }) => {
  const { setTranscript, start, stop, transcript, grammarList } = useSpeechRecognition();
  // Comment the above line and uncomment the below line for mocking voice input
  // const { recognition, setTranscript, start, transcript, grammarList } =
  //   useContext(SpeechRecognitionContext);

  // Current read cursor, starting at 0 obviously
  const [cursor, setCursor] = useState(0);

  const [listening, setListening] = useState(false);

  const handleListenClick = useCallback(() => {
    if (listening) {
      stop();
      setListening(false);
    } else {
      start();
      setListening(true);
    }
  }, [listening, setListening, start, stop]);

  // Split all the children into an array of one word or react element per item
  const script = useMemo(() => {
    if (typeof children === 'string') {
      return children.match(/[^\s—]+—?/g);
    }

    if (Array.isArray(children)) {
      return children
        .map((item) => (typeof item === 'string' ? item.match(/[^\s—]+—?/g) : item))
        .flat()
        .filter((item) => (typeof item === 'string' && item.length > 0) || item);
    }
  }, [children]);

  useEffect(() => {
    // Add words to grammar list
    script.forEach((item) => {
      if (typeof item === 'string') {
        grammarList.addFromString(item.replace(/[.,—]/, ''), 1);
      } else if (React.isValidElement(item)) {
        grammarList.addFromString(removePunc(item.props.children), 1);
      }
    });
  }, [grammarList, script]);

  // Whenever the speech transcript updates, let's analyze it and see if we hit any words in the script
  useEffect(() => {
    transcript
      .split(/[\s—]/)
      .slice(cursor)
      .forEach((spokenWord) => {
        // Get the word in the script at our current cursor point
        let scriptWord = script[cursor];

        if (scriptWord) {
          // If the word in the script is in a Cue, set the scriptWord to the Cue's children
          if (React.isValidElement(scriptWord)) {
            scriptWord = removePunc(scriptWord.props.children);
          }
          // If the spoken word matches our script word, remove the word from our speech transcript and move the cursor
          // which will cause useEffect to run again and analyze the next word
          // I'm 90% sure this can be done in an easier way
          if (spokenWord.toLowerCase() === removePunc(scriptWord.toLowerCase())) {
            setTranscript((oldTranscript) => oldTranscript.split(' ').slice(1).join(' '));
            setCursor((currentCursor) => currentCursor + 1);
          }
        }
      });
  }, [cursor, script, setTranscript, transcript]);
  // Add spaces to our script array so we can keep our Cues but also render spaces between words
  const renderedScript = useMemo(
    () => removeSpacesBetweenPunc(script.map((item, ix) => (ix !== 0 ? [' ', item] : item)).flat()),
    [script],
  );

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

  const handleLinkClick = () => {
    const top = screen.height / 24;
    const left = screen.width - screen.width / 36 - 300;
    window.open(
      '/companion',
      '_blank',
      `toolbar=no, titlebar=no, directories=no, status=no, menubar=no, scrollbars=no, width=300, height=300, top=${top}, left=${left}`,
    );
  };

  return (
    <div className="prompter">
      <div className="prompter__control-wrapper">
        <div className="prompter__controls">
          <button className="prompter__button" type="button" onClick={handleListenClick}>
            {listening ? 'Stop' : 'Start'} Listening
          </button>
          {linkShowing && (
            <button className="prompter__button" type="button" onClick={handleLinkClick}>
              The Link
            </button>
          )}
        </div>
      </div>
      <div className="prompter__script">
        <span className="prompter__read-script" ref={readElement}>
          {/* Need to multiply the cursor by 2 to account for the spaces we added */}
          {renderedScript.slice(0, cursor * 2)}
        </span>{' '}
        <span className="prompter__unread-script">
          {renderedScript
            .slice(cursor * 2)
            .map((item) => (React.isValidElement(item) ? item.props.children : item))
            .join('')}
        </span>
      </div>
    </div>
  );
};
