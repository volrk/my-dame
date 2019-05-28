import React from 'react';
import './App.css';
import Damier from './components/Damier/Damier';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <Damier></Damier>
      </header>
    </div>
  );
}

export default App;
