import { useState } from 'react';
import { HStack} from '@chakra-ui/react'
import { GameCard} from "../../comps/card";
import {Games} from '../../structs/games';
import { games } from '../../structs/games';
import './intro.css'

// import penguins from "../assets/cards/penguins.svg"



export function Intro(){

    const [gamesProps] = useState<Games>(games)

    return (
        <HStack spacing='50px'>
            {
                Object.entries(gamesProps).map(
                    ([title,game]) => <GameCard title={title} key={title} {...game}/>
                )
            }
       </HStack>
    )
}