
import * as React from 'react';
import './Damier.css';
import Case, {colorCase, CaseColor} from '../Case/Case';
import  Pion, { PionColor } from '../Pion/Pion';

export interface Props {
  nombreLigne:number;
};

interface State {
  selectedPion:Pion|undefined,
  listPion:Pion[];
};

function Damier(props:Props) {
  
  const [state, setState] = React.useState<State>(
    {selectedPion:undefined,listPion:initGame(props)}
  );

  let jeux=[];
  for (let y = 0; y < props.nombreLigne; y++) {
    let row = [];
    for (let x = 0; x < props.nombreLigne; x++) {
      let caseColor = colorCase(x,y);
      row.push(<Case  x={x}
                      key={y+""+x} 
                      y={y} 
                      select={()=>setState(handleClick(state,x,y))} 
                      caseColor={caseColor}
                      pionColor={findColorPion(state.listPion,x,y,caseColor)}/>);
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
  let pion = state.listPion.find(element=>{return (element.props.x===x && element.props.y===y)})
  if (pion!==undefined){
    return {...state, selectedPion:pion};
  }
  const selectedPion = state.selectedPion;
  if(selectedPion!==undefined){
    let list = state.listPion.filter(element=>{return (element.props.x!==selectedPion.props.x || element.props.y!==selectedPion.props.y)})
    list.push(new Pion({x:x,y:y,color:selectedPion.props.color}))
    return{...state, selectedPion:undefined,listPion:list}
  }
  return state;
}

function findColorPion(listPion:Pion[],x:number,y:number,caseColor:CaseColor):PionColor|null{
  for (let i = 0; i < listPion.length; i++) {
    const element = listPion[i];
    if(element.props.x===x && element.props.y===y){
      return element.props.color;
    }
  }
  return null;
}

function initGame(props:Props):Pion[]{

  let listPion:Pion[]=[];
  for (let y = 0; y < 2; y++) {
    for (let x = 0; x < props.nombreLigne; x++) {
      if(colorCase(x,y)===CaseColor.BLACK){
        listPion.push(new Pion({color:PionColor.BLACK,x:x,y:y}));
      }
    }
  }
  for (let y = props.nombreLigne-2; y < props.nombreLigne; y++) {
    for (let x = 0; x < props.nombreLigne; x++) {
      if(colorCase(x,y)===CaseColor.BLACK){
        listPion.push(new Pion({color:PionColor.WHITE,x:x,y:y}));
      }
    }
  }

  return listPion;

}

export default Damier;
