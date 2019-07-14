import Pion, { PionColor } from "../../components/Pion/Pion";
import { Constante } from "../../constante/Constante";

export function isAvance(pion:Pion,y:number):boolean{
  if(pion.props.color===PionColor.BLACK && pion.props.y-y<0){
    return true;
  }
  if(pion.props.color===PionColor.WHITE && pion.props.y-y>0){
    return true;
  }
  return false;
}

export function getPionEntre(list:(Pion|undefined)[][],selectedPion:Pion|undefined, x:number,y:number):Pion[]{
  let listPion:Pion[]=[]
  if(selectedPion!==undefined){
    for (let _x = selectedPion.props.x+1; _x <= selectedPion.props.x+Math.abs(selectedPion.props.x-x); _x++) {
      for (let _y = selectedPion.props.y+1; _y <= selectedPion.props.y+Math.abs(selectedPion.props.y-y); _y++) {
        if(Math.abs(selectedPion.props.x-_x)===Math.abs(selectedPion.props.y-_y)){
          let pion : Pion|undefined = undefined;
          if(selectedPion.props.x<x){
            if(selectedPion.props.y<y){
              pion = list[selectedPion.props.x+Math.abs(selectedPion.props.x-_x)][selectedPion.props.y+Math.abs(selectedPion.props.y-_y)];
            }else{
              pion = list[selectedPion.props.x+Math.abs(selectedPion.props.x-_x)][selectedPion.props.y-Math.abs(selectedPion.props.y-_y)];
            }
          }else{
            if(selectedPion.props.y<y){
              pion = list[selectedPion.props.x-Math.abs(selectedPion.props.x-_x)][selectedPion.props.y+Math.abs(selectedPion.props.y-_y)];
            }else{
              pion = list[selectedPion.props.x-Math.abs(selectedPion.props.x-_x)][selectedPion.props.y-Math.abs(selectedPion.props.y-_y)];
            }
          }
          if(pion!==undefined){
            listPion.push(pion)
          }
          break
        }
      }
    }
  }
  return listPion;
}

export function isDevientReine(pion:Pion,y:number):boolean{
  if(!pion.props.isReine){
    if(pion.props.color===PionColor.BLACK && y===Constante.ligneBlanc){
      return true;
    }
    if(pion.props.color===PionColor.WHITE && y===Constante.ligneNoir){
      return true;
    }
  }
  return false
}