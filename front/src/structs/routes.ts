export enum Routes {
    games='games',
    bank='bank',
    law='law',
    home='home',
    trophey='trophey'
}


export interface INavLink {
    name: string,
    items: string[],
    image: string
}

export type RouteNames = {
    [name: string]: INavLink
}


import { games } from "./games";
import puzzle from '../assets/games/puzzle.svg'
import knight from '../assets/games/knight.svg'


export const navLinks: RouteNames ={
    games: {
        name:'Игры',
        items: Object.values(games).map((val)=>val.name),
        image:  puzzle
    },
    trophey: {
        name: "Достижения",
        items: [
            'Трофеи',
            'Рейтинг'
        ],
        image: knight
    }
}


