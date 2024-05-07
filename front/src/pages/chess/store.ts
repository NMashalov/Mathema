import { atom } from "jotai";

export enum GameDifficulty{
    easy='easy',
    medium='medium',
    hard='hard'
}



export const chessDifficulty = atom<GameDifficulty>(GameDifficulty.easy)
export const chessScore = atom('1600')


export enum GameResult{
    PLAY='play',
    DRAW='draw',
    WIN='win',
    LOSE='lose',
}

export const gameResult = atom<GameResult>(GameResult.PLAY)


