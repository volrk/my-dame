
import * as React from 'react';
import './Damier.css';
import Case, {colorCase, CaseColor} from '../Case/Case';
import  Pion, { PionColor, PionInfos } from '../Pion/Pion';

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
                      pionInfos={findPion(state.listPion,x,y)}/>);
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
  const selectedPion = state.selectedPion;
  const pion = state.listPion.find(element=>{return (element.props.x===x && element.props.y===y)})
  if(selectedPion===undefined){
    if (pion!==undefined){
      let list = state.listPion.filter(element=>{return (element.props.x!==pion.props.x || element.props.y!==pion.props.y)})
      list.push(new Pion({x:x,y:y,infos:new PionInfos(pion.props.infos.color,true)}))
      return {...state, selectedPion:pion,listPion:list};
    }
    return state;
  }
  let list = state.listPion.filter(element=>{return (element.props.x!==selectedPion.props.x || element.props.y!==selectedPion.props.y)})
  if (pion!==undefined){
    list.push(new Pion({x:selectedPion.props.x,y:selectedPion.props.y,infos:new PionInfos(selectedPion.props.infos.color,false)}))
    list = list.filter(element=>{return (element.props.x!==pion.props.x || element.props.y!==pion.props.y)})
    list.push(new Pion({x:x,y:y,infos:new PionInfos(pion.props.infos.color,true)}))
    return {...state, selectedPion:pion,listPion:list};
  }
  list.push(new Pion({x:x,y:y,infos:new PionInfos(selectedPion.props.infos.color,false)}))
  return{...state, selectedPion:undefined,listPion:list}
}

function findPion(listPion:Pion[],x:number,y:number):PionInfos|null{
  for (let i = 0; i < listPion.length; i++) {
    const element = listPion[i];
    if(element.props.x===x && element.props.y===y){
      return element.props.infos;
    }
  }
  return null;
}

function initGame(props:Props):Pion[]{

  let listPion:Pion[]=[];
  for (let y = 0; y < 4; y++) {
    for (let x = 0; x < props.nombreLigne; x++) {
      if(colorCase(x,y)===CaseColor.BLACK){
        let infos = new PionInfos(PionColor.BLACK,false);
        listPion.push(new Pion({infos:infos,x:x,y:y}));
      }
    }
  }
  for (let y = props.nombreLigne-4; y < props.nombreLigne; y++) {
    for (let x = 0; x < props.nombreLigne; x++) {
      if(colorCase(x,y)===CaseColor.BLACK){
        let infos = new PionInfos(PionColor.WHITE,false);
        listPion.push(new Pion({infos:infos,x:x,y:y}));
      }
    }
  }

  return listPion;

}

export default Damier;
