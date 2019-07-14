
import * as React from 'react';
import './Damier.css';
import Case, {colorCase, CaseColor} from '../Case/Case';
import  Pion, { PionColor } from '../Pion/Pion';
import { Constante, ActionPossible } from '../../constante/Constante';
import { iaGame } from '../../service/IA/IAService';
import { isAvance, getPionEntre, isDevientReine } from '../../service/shared/SharedService';
import { delay } from 'q';

export interface Props {
};

export interface State {
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
      <button onClick={()=>setState(ia(state,PionColor.BLACK))}> Black IA </button>
      <button onClick={()=>setState(ia(state,PionColor.WHITE))}> White IA </button>
      <button onClick={async()=>{
        let test = 1;
        while (test<1000) {
          await delay(20)
          setState(ia(state,PionColor.BLACK))
          await delay(20)
          setState(ia(state,PionColor.WHITE))
          test++
        }
      }}> 1000 IA </button>
    </div>
    
  );
}

function ia(state:State,color:PionColor):State{
  const play = iaGame(state,color);
  if (play===undefined){
    return state;
  }
  let x = selectPion(state, play.pion.props.x,play.pion.props.y)
  switch (play.action) {
    case ActionPossible.Deplacement:
      return deplacerPion(x,play.x,play.y)    
    case ActionPossible.Manger:
      return mangerPion(x,play.x,play.y);
    default:
      return state;
  }
}

function handleClick(state:State, x:number,y:number):State{

  let action = getActionPossible(state,x,y);

  switch (action) {
    case ActionPossible.Rien:
      return state;
    case ActionPossible.Selection:
      return selectPion(state,x,y);
    case ActionPossible.Deselection:
      return deselectPion(state);
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
    list[x][y]=new Pion({x:x,y:y,color:pion.props.color, isSelected: true,isReine:pion.props.isReine})
  }
  if(selectedPion!==undefined){
    list[selectedPion.props.x][selectedPion.props.y]=new Pion({x:selectedPion.props.x,y:selectedPion.props.y,color:selectedPion.props.color, isSelected: false,isReine:selectedPion.props.isReine})
  }
  return {...state, selectedPion:pion,pions:list};
}

function deselectPion(state:State):State{
  let list =  state.pions.slice();
  const selectedPion = state.selectedPion;
  if(selectedPion!==undefined){
    list[selectedPion.props.x][selectedPion.props.y]=new Pion({x:selectedPion.props.x,y:selectedPion.props.y,color:selectedPion.props.color, isSelected: false, isReine:selectedPion.props.isReine})
  }
  return {...state, selectedPion:undefined,pions:list};
}

function deplacerPion(state:State, x:number,y:number):State{
  let list =  state.pions.slice();
  const selectedPion = state.selectedPion;
  if(selectedPion!==undefined){
    list[selectedPion.props.x][selectedPion.props.y]=undefined
    if(isDevientReine(selectedPion,y)){
      list[x][y]=new Pion({x:x,y:y,color:selectedPion.props.color, isSelected: false,isReine:true})
    }else{
      list[x][y]=new Pion({x:x,y:y,color:selectedPion.props.color, isSelected: false,isReine:selectedPion.props.isReine})
    }
  }
  return{...state, selectedPion:undefined,pions:list}
}

function mangerPion(state:State, x:number,y:number):State{
  let list =  state.pions.slice();
  const selectedPion = state.selectedPion;
  if(selectedPion!==undefined){
    const pionEntre = getPionEntre(state.pions,state.selectedPion,x,y)[0];
    list[selectedPion.props.x][selectedPion.props.y]=undefined
    if(isDevientReine(selectedPion,y)){
      list[x][y]=new Pion({x:x,y:y,color:selectedPion.props.color, isSelected: false,isReine:true})
    }else{
      list[x][y]=new Pion({x:x,y:y,color:selectedPion.props.color, isSelected: false,isReine:selectedPion.props.isReine})
    }
    if(pionEntre!==undefined){
      list[pionEntre.props.x][pionEntre.props.y]=undefined
    }
  }
  return{...state, selectedPion:undefined,pions:list}
}

export function getActionPossible(state:State, x:number,y:number):ActionPossible{
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
    if(!selectedPion.props.isReine){
      if(Math.abs(selectedPion.props.x-x)===1 && Math.abs(selectedPion.props.y-y)===1 && isAvance(selectedPion,y)){
        return ActionPossible.Deplacement;
      }
      if(Math.abs(selectedPion.props.x-x)===2 && Math.abs(selectedPion.props.y-y)===2 ){
        const pionEntre = list[(selectedPion.props.x+x)/2][(selectedPion.props.y+y)/2]
        if(pionEntre!==undefined && pionEntre.props.color!==selectedPion.props.color){
          return ActionPossible.Manger;
        }
      }
    }else{
      if(Math.abs(selectedPion.props.x-x)===Math.abs(selectedPion.props.y-y)){
        let pionsEntre = getPionEntre(state.pions,state.selectedPion,x,y)
        if(pionsEntre.length===0){
          return ActionPossible.Deplacement;
        }else if(pionsEntre.length===1 && pionsEntre[0].props.color!== selectedPion.props.color){
          return ActionPossible.Manger;
        }
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
        pions[x][y]=new Pion({x:x,y:y,color:PionColor.BLACK,isSelected:false,isReine:false})
      }
    }
  }
  for (let y = Constante.nombreLigneDamier-Constante.nombreLigneRempli; y < Constante.nombreLigneDamier; y++) {
    for (let x = 0; x < Constante.nombreLigneDamier; x++) {
      if(colorCase(x,y)===CaseColor.BLACK){
        pions[x][y]= new Pion({x:x,y:y,color:PionColor.WHITE,isSelected:false,isReine:false});
      }
    }
  }
  return pions;
}


export default Damier;
