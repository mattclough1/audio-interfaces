import React, { useState } from 'react';
import SpeechContext from './contexts/SpeechContext';
import Prompter from './components/Prompter';
import MockVoiceInput from './components/MockVoiceInput';

function App() {
  const [speechTranscript, setSpeechTranscript] = useState('');

  const triggerMap = {
    changeColor: (bgColor, textColor) => {
      console.log(bgColor, textColor);
      document.body.style.backgroundColor = bgColor;
      document.body.style.color = textColor;
    },
  };

  return (
    <div className="App">
      <SpeechContext.Provider value={{ speechTranscript, setSpeechTranscript }}>
        <Prompter callbacks={triggerMap}>
          This is a test. If I say the word blue[changeColor('#73e1ff', '#ffffff')] the background
          should change blue, and if I say the word pink[changeColor('#ffb3c4', '#ffffff')] the
          background should change to pink
        </Prompter>
        <MockVoiceInput />
      </SpeechContext.Provider>
    </div>
  );
}

export default App;
