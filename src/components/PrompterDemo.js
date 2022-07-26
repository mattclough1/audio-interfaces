import React, { useRef, useState } from 'react';

import { SpeechRecognitionProvider } from '../contexts/SpeechRecognitionContext';
import { Cue } from './Cue';
import { MockVoiceInput } from './MockVoiceInput';
import { Prompter } from './Prompter';

function changeColor(bgColor, textColor) {
  const root = document.documentElement;
  root.style.setProperty('--color-1', textColor);
  root.style.setProperty('--color-2', bgColor);
}

export const PrompterDemo = () => {
  const broadcastChannel = useRef(new BroadcastChannel('speech-demo'));
  const [linkShowing, setLinkShowing] = useState(false);
  return (
    <SpeechRecognitionProvider>
      <Prompter linkShowing={linkShowing}>
        Hi team! Thanks for letting me demo this for you. As I mentioned, this little app allows you
        to read text, and add scripted actions to any word in the text. For example, we can change
        the <Cue callback={() => changeColor('#fbeaeb', '#2f3c7e')}>color</Cue> to make it look a
        little more interesting. But it&apos;s not limited to color changes. After you read{' '}
        <Cue callback={() => setLinkShowing(true)}>this</Cue>, a link will appear at the top of the
        screen. Click the link and keep reading while watching for changes in the new window. Using
        a <Cue callback={() => broadcastChannel.current.postMessage('📡')}>broadcast</Cue> channel,
        we&apos;re now sending{' '}
        <Cue callback={() => broadcastChannel.current.postMessage('💌')}>messages</Cue> to the other
        window using our voice. We can look up the weather in{' '}
        <Cue callback={() => broadcastChannel.current.postMessage('weather')}>London</Cue>, show a
        funny <Cue callback={() => broadcastChannel.current.postMessage('gif')}>picture</Cue>, or do
        anything that code can do!
      </Prompter>
      {/* <MockVoiceInput /> */}
    </SpeechRecognitionProvider>
  );
};
