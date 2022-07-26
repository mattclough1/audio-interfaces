/* eslint-disable */
import React, { useRef } from 'react';
import { PrompterDemo } from './components/PrompterDemo';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Companion } from './components/Companion';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PrompterDemo />} />
          <Route path="companion" element={<Companion />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
