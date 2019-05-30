import React from 'react';
import './App.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCrown } from '@fortawesome/free-solid-svg-icons'
import Damier from './components/Damier/Damier';

library.add(faCrown)

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
