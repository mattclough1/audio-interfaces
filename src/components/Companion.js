import './Companion.css';

import React, { useRef, useState } from 'react';

import { Weather } from './Weather';

const states = {
  wave: '👋',
  weather: <Weather />,
};

export const Companion = () => {
  const broadcastChannel = useRef(new BroadcastChannel('speech-demo'));
  const [message, setMessage] = useState(states.wave);

  broadcastChannel.current.onmessage = (event) => {
    setMessage(states[event.data]);
  };
  return <div className="speech-demo__companion">{message}</div>;
};
