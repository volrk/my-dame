
import * as React from 'react';
import './Damier.css';
import Case, {colorCase, CaseColor} from '../Case/Case';
import  Pion, { PionColor } from '../Pion/Pion';
import { Constante } from '../../constante/Constante';

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
  let list =  state.pions.slice();
  const selectedPion = state.selectedPion;
  const pion = state.pions[x][y];

  if(selectedPion===undefined){
    if (pion!==undefined){
      list[x][y]=new Pion({x:x,y:y,color:pion.props.color, isSelected: true})
      return {...state, selectedPion:pion,pions:list};
    }
    return state;
  }
  if (pion!==undefined){
    list[selectedPion.props.x][selectedPion.props.y]=new Pion({x:selectedPion.props.x,y:selectedPion.props.y,color:selectedPion.props.color, isSelected: false})
    list[x][y]=new Pion({x:x,y:y,color:pion.props.color, isSelected: true})
     return {...state, selectedPion:pion,pions:list};
  }
  list[selectedPion.props.x][selectedPion.props.y]=undefined
  list[x][y]=new Pion({x:x,y:y,color:selectedPion.props.color, isSelected: false})
  return{...state, selectedPion:undefined,pions:list}
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

interface Test {

};
