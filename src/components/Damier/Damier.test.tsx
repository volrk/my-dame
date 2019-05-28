import React from 'react';
import ReactDOM from 'react-dom';
import Damier, { initGame } from './Damier';
import { Pion, PionColor } from '../Pion/Pion';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Damier/>, div);
  ReactDOM.unmountComponentAtNode(div);
});

test('no pion on 0 0', () => {
  const pions = initGame()
  expect(pions[0][0]).toBeUndefined
});

test('pion black on 1 0', () => {
  const pions = initGame()
  let pion:Pion|undefined=pions[1][0]
  expect(pion).toBeDefined
  if(pion!=undefined){
    expect(pion.props.color).toBe(PionColor.BLACK)
  }
});

test('pion black on 0 1', () => {
  const pions = initGame()
  let pion:Pion|undefined=pions[0][1]
  expect(pion).toBeDefined
  if(pion!=undefined){
    expect(pion.props.color).toBe(PionColor.BLACK)
  }
});

test('pion white on 0 10', () => {
  const pions = initGame()
  let pion:Pion|undefined=pions[0][10]
  expect(pion).toBeDefined
  if(pion!=undefined){
    expect(pion.props.color).toBe(PionColor.WHITE)
  }
});

