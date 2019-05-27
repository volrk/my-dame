import React from 'react';
import './App.css';
import Damier from './components/components/Damier/Damier';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <Damier nombreLigne={10}></Damier>
      </header>
    </div>
  );
}

export default App;
