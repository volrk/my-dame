import React from 'react';
import ReactDOM from 'react-dom';
import Damier from './Damier';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Damier nombreLigne={10}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});

