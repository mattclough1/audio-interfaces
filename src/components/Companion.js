import './Companion.css';

import React, { useRef, useState } from 'react';

import { Weather } from './Weather';

const states = {
  weather: <Weather />,
  gif: <img alt="wow" src="https://media.giphy.com/media/xT77XWum9yH7zNkFW0/giphy.gif" />,
};

export const Companion = () => {
  const broadcastChannel = useRef(new BroadcastChannel('speech-demo'));
  const [message, setMessage] = useState('👋');

  broadcastChannel.current.onmessage = (event) => {
    setMessage(states[event.data] || event.data);
  };
  return <div className="speech-demo__companion">{message}</div>;
};
