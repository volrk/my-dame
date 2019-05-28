
import React from 'react';
import './Case.css';
import Pion from '../Pion/Pion';


export interface Props {
    x:number,
    y:number,
    pion: Pion|undefined,
    caseColor:CaseColor,
    select : ()=>void

}

function Case(props:Props) {
  return (
    <div className={"case " +props.caseColor} onClick={()=>props.select()}>
        {props.pion===undefined? <></>:<Pion x={props.pion.props.x} y={props.pion.props.y} color={props.pion.props.color} isSelected={props.pion.props.isSelected}/>}
    </div>
  );
}

export default Case;

export enum CaseColor{
    BLACK = "black",
    WHITE = "white",
}

export function colorCase(x:number,y:number):CaseColor{
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
