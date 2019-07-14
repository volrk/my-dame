import React from 'react';
import ReactDOM from 'react-dom';
import Damier, { initGame, getActionPossible, State } from './Damier';
import { Pion, PionColor } from '../Pion/Pion';
import { Constante, ActionPossible } from '../../constante/Constante';

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

test('pion white selected can go from x=3 y =6 to x=2|4 y =5', () => {
  const pion = new Pion({x:3,y:6,color:PionColor.WHITE,isSelected:true,isReine:false})
  let pions = [...Array(Constante.nombreLigneDamier)].map(() => [...Array(Constante.nombreLigneDamier)])
  pions[3][6]= pion
  const state:State = {pions:pions,selectedPion:pion};
  const action1 = getActionPossible(state,2,5)
  const action2 = getActionPossible(state,4,5)

  expect(action1).toBe(ActionPossible.Deplacement)
  expect(action2).toBe(ActionPossible.Deplacement)

});

test('pion white selected can not go from x=3 y =6 to x=2|4 y =7', () => {
  const pion = new Pion({x:3,y:6,color:PionColor.WHITE,isSelected:true,isReine:false})
  let pions = [...Array(Constante.nombreLigneDamier)].map(() => [...Array(Constante.nombreLigneDamier)])
  pions[3][6]= pion
  const state:State = {pions:pions,selectedPion:pion};
  const action1 = getActionPossible(state,2,7)
  const action2 = getActionPossible(state,4,7)

  expect(action1).toBe(ActionPossible.Rien)
  expect(action2).toBe(ActionPossible.Rien)

});

test('pion black selected can not go from x=3 y =6 to x=2|4 y =5', () => {
  const pion = new Pion({x:3,y:6,color:PionColor.BLACK,isSelected:true,isReine:false})
  let pions = [...Array(Constante.nombreLigneDamier)].map(() => [...Array(Constante.nombreLigneDamier)])
  pions[3][6]= pion
  const state:State = {pions:pions,selectedPion:pion};
  const action1 = getActionPossible(state,2,5)
  const action2 = getActionPossible(state,4,5)

  expect(action1).toBe(ActionPossible.Rien)
  expect(action2).toBe(ActionPossible.Rien)

});

test('pion black selected can go from x=3 y =6 to x=2|4 y =7', () => {
  const pion = new Pion({x:3,y:6,color:PionColor.BLACK,isSelected:true,isReine:false})
  let pions = [...Array(Constante.nombreLigneDamier)].map(() => [...Array(Constante.nombreLigneDamier)])
  pions[3][6]= pion
  const state:State = {pions:pions,selectedPion:pion};
  const action1 = getActionPossible(state,2,7)
  const action2 = getActionPossible(state,4,7)

  expect(action1).toBe(ActionPossible.Deplacement)
  expect(action2).toBe(ActionPossible.Deplacement)

});

