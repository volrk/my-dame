
import * as React from 'react';
import './Damier.css';
import Case, {colorCase, CaseColor} from '../Case/Case';
import  Pion, { PionColor } from '../Pion/Pion';
import { Constante, ActionPossible } from '../../constante/Constante';

export interface Props {
};

interface State {
  selectedPion:Pion|undefined,
  pions: (undefined|Pion)[][];
};

function Damier(props:Props) {
  
  const [state, setState] = React.useState<State>(
    {selectedPion:undefined,pions:initGame()}
  );

  let jeux=[];
  for (let y = 0; y < Constante.nombreLigneDamier; y++) {
    let row = [];
    for (let x = 0; x < Constante.nombreLigneDamier; x++) {
      row.push(<Case  x={x}
                      key={y+""+x} 
                      y={y} 
                      select={()=>setState(handleClick(state,x,y))} 
                      caseColor={colorCase(x,y)}
                      pion={state.pions[x][y]}/>);
    }
    jeux.push(<div className="board-row" key={y}>{row}</div>)
  }

  return (
    <div>
      {jeux}
    </div>
  );
}

function handleClick(state:State, x:number,y:number):State{

  let action = getActionPossible(state,x,y);

  switch (action) {
    case ActionPossible.Rien:
      return state;
    case ActionPossible.Selection:
      return selectPion(state,x,y);
    case ActionPossible.Deselection:
      return deselectPion(state,x,y);
    case ActionPossible.Deplacement:
      return deplacerPion(state,x,y);
    case ActionPossible.Manger:
      return mangerPion(state,x,y);
    default:
      return state;
  }
}

function selectPion(state:State, x:number,y:number):State{
  let list =  state.pions.slice();
  const selectedPion = state.selectedPion;
  const pion = state.pions[x][y];
  if(pion!==undefined){
    list[x][y]=new Pion({x:x,y:y,color:pion.props.color, isSelected: true})
  }
  if(selectedPion!==undefined){
    list[selectedPion.props.x][selectedPion.props.y]=new Pion({x:selectedPion.props.x,y:selectedPion.props.y,color:selectedPion.props.color, isSelected: false})
  }
  return {...state, selectedPion:pion,pions:list};
}

function deselectPion(state:State, x:number,y:number):State{
  let list =  state.pions.slice();
  const selectedPion = state.selectedPion;
  if(selectedPion!==undefined){
    list[selectedPion.props.x][selectedPion.props.y]=new Pion({x:selectedPion.props.x,y:selectedPion.props.y,color:selectedPion.props.color, isSelected: false})
  }
  return {...state, selectedPion:undefined,pions:list};
}

function deplacerPion(state:State, x:number,y:number):State{
  let list =  state.pions.slice();
  const selectedPion = state.selectedPion;
  if(selectedPion!==undefined){
    list[selectedPion.props.x][selectedPion.props.y]=undefined
    list[x][y]=new Pion({x:x,y:y,color:selectedPion.props.color, isSelected: false})
  }
  return{...state, selectedPion:undefined,pions:list}
}

function mangerPion(state:State, x:number,y:number):State{
  let list =  state.pions.slice();
  const selectedPion = state.selectedPion;
  if(selectedPion!==undefined){
    const pionEntre = list[(selectedPion.props.x+x)/2][(selectedPion.props.y+y)/2]
    list[selectedPion.props.x][selectedPion.props.y]=undefined
    list[x][y]=new Pion({x:x,y:y,color:selectedPion.props.color, isSelected: false})
    if(pionEntre!==undefined){
      list[pionEntre.props.x][pionEntre.props.y]=undefined
    }
  }
  return{...state, selectedPion:undefined,pions:list}
}

function getActionPossible(state:State, x:number,y:number):ActionPossible{
  const list =  state.pions;
  const selectedPion = state.selectedPion;
  const pion = state.pions[x][y];

  if (pion!==undefined){
    if(selectedPion!==undefined && selectedPion.equal(pion)){
      return ActionPossible.Deselection;
    }
    return ActionPossible.Selection;
  }
  if(selectedPion!==undefined){
    if(Math.abs(selectedPion.props.x-x)===1 && Math.abs(selectedPion.props.y-y)===1){
      return ActionPossible.Deplacement;
    }
    if(Math.abs(selectedPion.props.x-x)===2 && Math.abs(selectedPion.props.y-y)===2 ){
      const pionEntre = list[(selectedPion.props.x+x)/2][(selectedPion.props.y+y)/2]
      if(pionEntre!==undefined && pionEntre.props.color!==selectedPion.props.color){
        return ActionPossible.Manger;
      }
    }
  }
  return ActionPossible.Rien;

}

export function initGame():(undefined|Pion)[][]{
  let pions = [...Array(Constante.nombreLigneDamier)].map(() => [...Array(Constante.nombreLigneDamier)])
  for (let y = 0; y < Constante.nombreLigneRempli; y++) {
    for (let x = 0; x < Constante.nombreLigneDamier; x++) {
      if(colorCase(x,y)===CaseColor.BLACK){
        pions[x][y]=new Pion({x:x,y:y,color:PionColor.BLACK,isSelected:false})
      }
    }
  }
  for (let y = Constante.nombreLigneDamier-Constante.nombreLigneRempli; y < Constante.nombreLigneDamier; y++) {
    for (let x = 0; x < Constante.nombreLigneDamier; x++) {
      if(colorCase(x,y)===CaseColor.BLACK){
        pions[x][y]= new Pion({x:x,y:y,color:PionColor.WHITE,isSelected:false});
      }
    }
  }
  return pions;
}


export default Damier;
