
import * as React from 'react';
import './Damier.css';
import Case, {colorCase, CaseColor} from '../Case/Case';
import  Pion, { PionColor } from '../Pion/Pion';
import { Constante, ActionPossible } from '../../constante/Constante';

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
    case ActionPossible.DevientReine:
      return pionDevientReine(state,x,y);    
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

function deselectPion(state:State, x:number,y:number):State{
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
    list[x][y]=new Pion({x:x,y:y,color:selectedPion.props.color, isSelected: false,isReine:selectedPion.props.isReine})
  }
  return{...state, selectedPion:undefined,pions:list}
}

function pionDevientReine(state:State, x:number,y:number):State{
  let list =  state.pions.slice();
  const selectedPion = state.selectedPion;
  if(selectedPion!==undefined){
    list[selectedPion.props.x][selectedPion.props.y]=undefined
    list[x][y]=new Pion({x:x,y:y,color:selectedPion.props.color, isSelected: false,isReine:true})
  }
  return{...state, selectedPion:undefined,pions:list}
}

function mangerPion(state:State, x:number,y:number):State{
  let list =  state.pions.slice();
  const selectedPion = state.selectedPion;
  if(selectedPion!==undefined){
    const pionEntre = getPionEntre(state,x,y)[0];
    list[selectedPion.props.x][selectedPion.props.y]=undefined
    list[x][y]=new Pion({x:x,y:y,color:selectedPion.props.color, isSelected: false, isReine:selectedPion.props.isReine})
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
        if(isDevientReine(selectedPion,y)){
          return ActionPossible.DevientReine;
        }
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
        let nombrePionEntre = getPionEntre(state,x,y).length
        if(nombrePionEntre===0){
          return ActionPossible.Deplacement;
        }else if(nombrePionEntre===1){
          return ActionPossible.Manger;
        }
      }
    }

  }
  return ActionPossible.Rien;
}

function getPionEntre(state:State, x:number,y:number):Pion[]{
  let listPion:Pion[]=[]
  const list =  state.pions;
  const selectedPion = state.selectedPion;
  if(selectedPion!==undefined){
    for (let _x = selectedPion.props.x+1; _x <= selectedPion.props.x+Math.abs(selectedPion.props.x-x); _x++) {
      for (let _y = selectedPion.props.y+1; _y <= selectedPion.props.y+Math.abs(selectedPion.props.y-y); _y++) {
        if(Math.abs(selectedPion.props.x-_x)===Math.abs(selectedPion.props.y-_y)){
          let pion = undefined;
          if(selectedPion.props.x<x){
            if(selectedPion.props.y<y){
              pion = list[selectedPion.props.x+Math.abs(selectedPion.props.x-_x)][selectedPion.props.y+Math.abs(selectedPion.props.y-_y)];
            }else{
              pion = list[selectedPion.props.x+Math.abs(selectedPion.props.x-_x)][selectedPion.props.y-Math.abs(selectedPion.props.y-_y)];
            }
          }else{
            if(selectedPion.props.y<y){
              pion = list[selectedPion.props.x-Math.abs(selectedPion.props.x-_x)][selectedPion.props.y+Math.abs(selectedPion.props.y-_y)];
            }else{
              pion = list[selectedPion.props.x-Math.abs(selectedPion.props.x-_x)][selectedPion.props.y-Math.abs(selectedPion.props.y-_y)];
            }
          }
          if(pion!==undefined){
            listPion.push(pion)
          }
          break
        }
      }
    }
  }
  return listPion;
}

function isAvance(pion:Pion,y:number):boolean{
  if(pion.props.color===PionColor.BLACK && pion.props.y-y<0){
    return true;
  }
  if(pion.props.color===PionColor.WHITE && pion.props.y-y>0){
    return true;
  }
  return false;
}

function isDevientReine(pion:Pion,y:number):boolean{
  if(!pion.props.isReine){
    if(pion.props.color===PionColor.BLACK && y===Constante.ligneBlanc){
      return true;
    }
    if(pion.props.color===PionColor.WHITE && y===Constante.ligneNoir){
      return true;
    }
  }
  return false
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
