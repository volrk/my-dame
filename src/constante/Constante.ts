export class Constante{
    static nombreLigneDamier = 10;
    static nombreLigneRempli = 4;
    static ligneNoir = 0
    static ligneBlanc = 9
}

export enum ActionPossible{
    Rien,
    Selection,
    DevientReine,
    Deselection,
    Deplacement,
    Manger
}