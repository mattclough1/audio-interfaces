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
        In the summer of 1977, a fire swept across the wilderness of interior Alaska, west of
        Denali, which was then still officially known as Mount McKinley. Tundra burned to rock;
        345,000 acres of forest—more than 530 square miles—disappeared in flames. When the smoke
        cleared, it left behind a weird scar on the map, a vast, charred crater littered with
        deadfall. In the winter, when temperatures in the interior dive to forty below, the
        skeletons of burned trees snapped in the cold or were ripped out by powerful winds. Tussocks
        of tundra grass froze as hard as bowling balls. Every year in early March, the Iditarod
        Trail Sled Dog Race sets out from Anchorage, in the south-central part of the state, and
        runs northwest toward the finish line in Nome, on the coast of the Bering Sea. In its early
        stages, the trail runs uphill, into the mountains of the Alaska Range, then plunges down,
        into the interior, where it enters the fire’s scorched country.
      </Prompter>
      {/* <MockVoiceInput /> */}
    </SpeechRecognitionProvider>
  );
};
