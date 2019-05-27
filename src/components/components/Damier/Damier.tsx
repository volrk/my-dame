
import * as React from 'react';
import './Damier.css';
import Case from '../Case/Case';
import  Pion, { PionColor } from '../Pion/Pion';

export interface Props {
  nombreLigne:number,
}

export interface State {
  nombreLigne:number,
}

function Damier(props:Props) {
  let listPion:Pion[]=[];
  listPion.push(new Pion({x:1,y:2,color:PionColor.WHITE}));
  let jeux=[];
  for (let i = 0; i < props.nombreLigne; i++) {
    let row = [];
    for (let j = 0; j < props.nombreLigne; j++) {
      row.push(<Case x={i} y={j} pionColor={findColorPion(listPion,i,j)}></Case>);
    }
    jeux.push(<div className="board-row">{row}</div>)
  }

  return (
    <div>
      {jeux}
    </div>
  );
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
