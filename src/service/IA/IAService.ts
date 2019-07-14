import { ActionPossible, Constante } from "../../constante/Constante";
import Pion, { PionColor } from "../../components/Pion/Pion";
import { State } from "../../components/Damier/Damier";
import { isAvance, getPionEntre } from "../shared/SharedService";


export interface ActionIA {
    pion :Pion;
    action :ActionPossible;
    x:number;
    y:number
};

export function iaGame(state:State, color :PionColor) : ActionIA{

    let listPion :Pion[]= []

    state.pions.flatMap(element=>element).forEach(element=>{
        if(element!==undefined){
            listPion.push(element);
        }
    })

    let pions = listPion.filter(pion=>pion.props.color===color)
    let movePossible = pions.flatMap(element=>getMovesPossibles(state,element))
    return movePossible[Math.floor(Math.random()*movePossible.length)];
}

function getMovesPossibles(state:State, pion: Pion):ActionIA[]{
    let deplacementposible :ActionIA[] = [];
    deplacementposible = deplacementposible.concat(getDeplacementsPossible(state,pion))
    deplacementposible = deplacementposible.concat(getMangerPossible(state,pion))
    return deplacementposible;

}

function getMangerPossible (state:State, pion: Pion):ActionIA[]{
    let deplacementposible :ActionIA[] = [];
    if(!pion.props.isReine){
        for (let dx = -2; dx <= 2; dx++) {
            for (let dy = -2; dy <= 2; dy++) {
                if(Math.abs(dx)===Math.abs(dy) && Math.abs(dx)===2 ){
                    if(validerMangerPion(pion,dx,dy,state)){
                        deplacementposible.push(getManger(pion,dx,dy))
                    }
                }
            }   
        }
    }else{
        for (let dx = -10; dx <= 10; dx++) {
            for (let dy = -10; dy <= 10; dy++) {
                if(Math.abs(dx)===Math.abs(dy) && Math.abs(dx)>=2 ){
                    if(validerMangerPion(pion,dx,dy,state)){
                        deplacementposible.push(getManger(pion,dx,dy))
                    }
                }
            }   
        } 
    }
    return deplacementposible;
}

function getManger(pion:Pion, dx:number,dy:number):ActionIA{
    return {pion:pion,action:ActionPossible.Manger,x:pion.props.x+dx,y:pion.props.y+dy}
}

function validerMangerPion(pion:Pion, dx:number,dy:number, state:State) : boolean{
    if(validerDeplacementInBoard(pion,dx,dy) && state.pions[pion.props.x+dx][pion.props.y+dy]===undefined){
        let pionsEntre = getPionEntre(state.pions,pion,pion.props.x+dx,pion.props.y+dy)
        if(pionsEntre.length===1 && pion.props.color!== pionsEntre[0].props.color){
            return true;
        }  
    }
    return false;
}

function getDeplacementsPossible (state:State, pion: Pion):ActionIA[]{
    let deplacementposible :ActionIA[] = [];
    if(!pion.props.isReine){
        for (let dx = -1; dx <= 1; dx++) {
            for (let dy = -1; dy <= 1; dy++) {
                if(Math.abs(dx)===Math.abs(dy) && dx!==0 ){
                    if(validerDeplacementPion(pion,dx,dy,state)){
                        deplacementposible.push(getDeplacement(pion,dx,dy))
                    }
                }
            }   
        }
    }else{
        for (let dx = -10; dx <= 10; dx++) {
            for (let dy = -10; dy <= 10; dy++) {
                if(Math.abs(dx)===Math.abs(dy) && Math.abs(dx)>=1 ){
                    if(validerDeplacementReine(pion,dx,dy,state)){
                        deplacementposible.push(getDeplacement(pion,dx,dy))
                    }
                }
            }   
        }
    }
    return deplacementposible;
}

function getDeplacement(pion:Pion, dx:number,dy:number):ActionIA{
    return {pion:pion,action:ActionPossible.Deplacement,x:pion.props.x+dx,y:pion.props.y+dy}
}

function validerDeplacementPion(pion:Pion, dx:number,dy:number, state:State) : boolean{
    if(validerDeplacementInBoard(pion,dx,dy) && isAvance(pion,pion.props.y+dy) && state.pions[pion.props.x+dx][pion.props.y+dy]===undefined){
        return true;
    }
    return false;
}

function validerDeplacementReine(pion:Pion, dx:number,dy:number, state:State) : boolean{
    if(validerDeplacementInBoard(pion,dx,dy) && getPionEntre(state.pions,pion,pion.props.x+dx,pion.props.y+dy).length===0 && state.pions[pion.props.x+dx][pion.props.y+dy]===undefined){
        return true;
    }
    return false;
}

function validerDeplacementInBoard(pion:Pion, dx:number,dy:number) : boolean{
    if(pion.props.x+dx<Constante.nombreLigneDamier && pion.props.x+dx>=0){
        if(pion.props.y+dy<Constante.nombreLigneDamier && pion.props.y+dy>=0){
            return true;
        }
    }
    return false;
}


