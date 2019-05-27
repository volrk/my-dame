
import React from 'react';
import './Case.css';
import Pion, { PionColor } from '../Pion/Pion';


export interface Props {
    x:number,
    y:number,
    pionColor: PionColor|null,
    select : ()=>void

}

function Case(props:Props) {
  return (
    <div className={"case " +color(props.x,props.y)} onClick={()=>props.select()}>
        {props.pionColor===null?<></>:<Pion x={props.x} y={props.y} color={props.pionColor} />}
    </div>
  );
}

export default Case;

enum CaseColor{
    BLACK = "black",
    WHITE = "white",
}

function color(x:number,y:number):CaseColor{
    if(x%2===0){
        if(y%2===0){
            return CaseColor.WHITE;
        }
        return CaseColor.BLACK;
    }
    if(y%2===0){
        return CaseColor.BLACK;
    }
    return CaseColor.WHITE;
}


