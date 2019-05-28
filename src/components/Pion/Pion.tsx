
import * as React from 'react';
import './Pion.css';

export enum PionColor{
  BLACK = "black",
  WHITE = "white"
}

export interface Props {
  x:number,
  y:number,
  color:PionColor
  isSelected:boolean
}

export class  Pion extends React.Component<Props> {
  render() {
    return <div className={"pion " +this.props.color + " " + (this.props.isSelected?"selected":"")}>
     </div>
  }
}


export default Pion;




