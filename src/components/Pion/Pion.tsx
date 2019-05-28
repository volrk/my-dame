
import * as React from 'react';
import './Pion.css';

export enum PionColor{
  BLACK = "black",
  WHITE = "white"
}
export class PionInfos{
  color:PionColor = PionColor.BLACK;
  isSelected:boolean =false;

  constructor(color:PionColor,isSelected:boolean ){
    this.color=color;
    this.isSelected=isSelected;
  }
}

export interface Props {
  x:number,
  y:number,
  infos:PionInfos,
}

export class  Pion extends React.Component<Props> {
  render() {
    return <div className={"pion " +this.props.infos.color + " " + (this.props.infos.isSelected?"selected":"")}>
     </div>
  }
}


export default Pion;




