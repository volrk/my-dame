import React from 'react';
import ReactDOM from 'react-dom';
import Case, { CaseColor, colorCase } from './Case';
import Pion, { PionColor } from '../Pion/Pion';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Case caseColor={CaseColor.BLACK} 
                        pion={new Pion({x:1, y:1, color:PionColor.BLACK,isSelected:false,isReine:false})}
                        select={()=>{}}
                        x={1}
                        y={1}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});

test('gives color white when x=0 y=0', () => {
  const color = colorCase(0,0)
  expect(color).toBe(CaseColor.WHITE)
});

test('gives color white when x=1 y=1', () => {
  const color = colorCase(1,1)
  expect(color).toBe(CaseColor.WHITE)
});

test('gives color black when x=0 y=1', () => {
  const color = colorCase(0,1)
  expect(color).toBe(CaseColor.BLACK)
});

test('gives color black when x=1 y=0', () => {
  const color = colorCase(1,0)
  expect(color).toBe(CaseColor.BLACK)
});
