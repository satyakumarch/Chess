import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from './screens/Landing';
import Game from './screens/Game';
import './App.css'

function App() {
  return (
    <>
      
        <BrowserRouter>
        <div className='h-screen bg-slate-800'>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/game" element={<Game />} />

          </Routes>
          </div>

        </BrowserRouter>

    
    </>
  );
}

export default App;

