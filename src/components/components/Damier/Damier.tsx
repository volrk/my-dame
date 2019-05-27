
import * as React from 'react';
import './Damier.css';
import Case from '../Case/Case';
import  Pion, { PionColor } from '../Pion/Pion';

export interface Props {
  nombreLigne:number;
};

export interface State {
  selectedPion:Pion|undefined,
  listPion:Pion[];
};

function Damier(props:Props) {
  
  const [state, setState] = React.useState<State>(
    {selectedPion:undefined,listPion:[]}
  );

  state.listPion.length===0? setState({selectedPion:undefined,listPion:[new Pion({x:1,y:2,color:PionColor.WHITE})]}):console.log(state);

  let jeux=[];
  for (let i = 0; i < props.nombreLigne; i++) {
    let row = [];
    for (let j = 0; j < props.nombreLigne; j++) {
      row.push(<Case  x={i}
                      key={i+""+j} 
                      y={j} 
                      select={()=>setState(handleClick(state,i,j))} 
                      pionColor={findColorPion(state.listPion,i,j)}/>);
    }
    jeux.push(<div className="board-row" key={i}>{row}</div>)
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
    return {selectedPion:pion,listPion:state.listPion};
  }
  const selectedPion = state.selectedPion;
  if(selectedPion!==undefined){
    let list = state.listPion.filter(element=>{return (element.props.x!==selectedPion.props.x && element.props.y===selectedPion.props.y)})
    list.push(new Pion({x:x,y:y,color:selectedPion.props.color}))
    return{selectedPion:undefined,listPion:list}
  }
  return state;
}


function findColorPion(listPion:Pion[],x:number,y:number):PionColor|null{
  for (let i = 0; i < listPion.length; i++) {
    const element = listPion[i];
    if(element.props.x===x && element.props.y===y){
      return element.props.color;
    }
  }
  return null;
}


export default Damier;
