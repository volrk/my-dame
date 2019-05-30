import React from 'react';
import ReactDOM from 'react-dom';
import Pion, { PionColor } from './Pion';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Pion x={1} y={1} color={PionColor.BLACK} isSelected={false} isReine={false}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});

