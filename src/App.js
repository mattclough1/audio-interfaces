/* eslint-disable */
import React, { useState } from 'react';
import { SpeechRecognitionProvider } from './contexts/SpeechRecognitionContext';
import { Prompter } from './components/Prompter';
import Cue from './components/Cue';
import MockVoiceInput from './components/MockVoiceInput';

function changeColor(bgColor, textColor) {
  const root = document.documentElement;
  root.style.setProperty('--color-1', textColor);
  root.style.setProperty('--color-2', bgColor);
}

function App() {
  return (
    <div className="App">
      <SpeechRecognitionProvider>
        <Prompter>
          After sleeping through a hundred million centuries we have finally opened our eyes on a
          sumptuous planet, sparkling with color, bountiful with life. Within decades we must close
          our eyes again. Isn’t it a noble, an enlightened way of spending our brief time in the
          sun, to work at understanding the universe and how we have come to wake up in it? This is
          how I answer when I am asked—as I am surprisingly often—why I bother to get up in the
          mornings.
        </Prompter>
        {/* <MockVoiceInput /> */}
      </SpeechRecognitionProvider>
    </div>
  );
}

export default App;
