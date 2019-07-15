import React, { useState } from 'react';
import SpeechContext from './contexts/SpeechContext';
import Prompter from './components/Prompter/';
import MockVoiceInput from './components/MockVoiceInput';

const Cue = ({ children }) => {
  return <span>children</span>;
};

function changeColor(bgColor, textColor) {
  document.body.style.backgroundColor = bgColor;
  document.body.style.color = textColor;
}

function App() {
  const [speechTranscript, setSpeechTranscript] = useState('');

  return (
    <div className="App">
      <SpeechContext.Provider value={{ speechTranscript, setSpeechTranscript }}>
        <Prompter>
          This is a test. Let's change the background
          <Cue
            callback={() => {
              changeColor('#fce77d', '#f96167');
            }}
          >
            color
          </Cue>
          . In fact, let's make this speech a bit longer and do some more things later on. But first
          let's describe some tech things, and once we're done with that, we'll change the
          background color <Cue callback={() => changeColor('#fbeaeb', '#2f3c7e')}>again</Cue>
        </Prompter>
        <MockVoiceInput />
      </SpeechContext.Provider>
    </div>
  );
}

export default App;
