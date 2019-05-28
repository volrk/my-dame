
import React from 'react';
import './Case.css';
import Pion, {PionInfos } from '../Pion/Pion';


export interface Props {
    x:number,
    y:number,
    pionInfos: PionInfos|null,
    caseColor:CaseColor,
    select : ()=>void

}

function Case(props:Props) {
  return (
    <div className={"case " +props.caseColor} onClick={()=>props.select()}>
        {props.pionInfos===null? <></>:<Pion x={props.x} y={props.y} infos={props.pionInfos} />}
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
