import boat from "../assets/cards/boat.svg";
import hedgehog from "../assets/cards/hedgehog.svg";
import penguins from "../assets/cards/penguins.svg";
export enum GameTitles {
    journal='journal',
    draw='draw',
    chess='chess'
}


export enum Difficulty {
    easy = 'Просто',
    medium = 'Средне',
    hard = 'Сложно'
}


export enum Media {
    text = 'Текст',
    image = 'Картинки'
}

export interface IGameDescription {
    image: string;
    name: string;
    difficulty: Difficulty;
    media: Media[];
    description: string;
    hintText?: string;
    url: string
}

export type Games = {
    [key in GameTitles] : IGameDescription
}



export const games : Games = {
    draw: {
        image: boat,
        name: 'Нарисуй',
        media: [Media.text],
        description:'Используй современный редактор для наброска' ,
        difficulty: Difficulty.easy,
        url: '/draw'
    },
    journal: {
        image: hedgehog,
        name: 'Интерактивный журнал',
        media: [Media.text],
        description: 'Ищи задачи по интересам' ,
        difficulty: Difficulty.hard,
        url: '/pdf'
    },
    chess: {
        image: penguins,
        name: 'Шахматы',
        media: [Media.image, Media.text],
        description: 'Сыграй партию' ,
        difficulty: Difficulty.easy,
        url: '/chess'
    }
}
