import logo from './logo.svg';
import './App.css';
import Navbar from './Navbar';
// import Game from './Game';
import Game from './Game';
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Navbar />

      </header>
      <Game />
    </div>
  );
}

export default App;
