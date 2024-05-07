import { useState } from "react";
import { ChessBox } from "./chess";
import './chess.css'
import { useAtom } from "jotai";
import { chessDifficulty, chessScore } from "./store";
import { HStack,Text, VStack } from "@chakra-ui/react";

function ChessHeader(){
    const [score]= useAtom(chessScore)
    const [difficulty] = useAtom(chessDifficulty)
    return (
        <div>
            <HStack>
                <Text>{score}</Text>
                <Text>{difficulty}</Text>
            </HStack>
        </div>
    )
}


export function ChessApp(){
    const [counter] = useState(0)
    return (
        <div className="ChessBoard">
            <VStack>
                <ChessHeader/>
                <ChessBox/>
            </VStack>
        </div>
    )
}