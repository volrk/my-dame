import React from 'react';
import ReactDOM from 'react-dom';
import Pion, { PionColor, PionInfos } from './Pion';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Pion x={1} y={2} infos={new PionInfos(PionColor.BLACK,false)}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});

