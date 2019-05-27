
import * as React from 'react';
import './Pion.css';

export enum PionColor{
  BLACK = "black",
  WHITE = "white"
}

export interface Props {
  x:number,
  y:number,
  color:PionColor,
}

export class  Pion extends React.Component<Props> {

  render() {
    return <button className={"pion " + this.props.color}>
     </button>
  }
}


export default Pion;




