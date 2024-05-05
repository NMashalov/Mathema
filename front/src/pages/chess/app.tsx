import { useState } from "react";
import { ChessBox } from "./chess";
import './chess.css'


function ChessHeader(){
    return (

    )
}


export function ChessApp(){
    const [counter] = useState(0)
    return (
        <div className="ChessBoard">
            <ChessBox/>
        </div>
    )
}