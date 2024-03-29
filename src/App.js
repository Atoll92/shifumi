
import './App.css';
import Navbar from './Components/Navbar';
import Game from './Game/Game';
import React from 'react';

function App() {
  return (
    <div className="App">
      <header className="App-header mb-2">
        <Navbar />
      </header>
      <Game />
    </div>
  );
}

export default App;
