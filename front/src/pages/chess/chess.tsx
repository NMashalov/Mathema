import { useState } from "react";
import {Chess} from "chess.js";
import { Chessboard } from "react-chessboard";
import { useChessApi,CHESS_ROUTES } from "./api";
import { useAtom } from "jotai";
import { gameResult, GameResult, chessDifficulty, GameDifficulty} from "./store";
import { Button, Progress, Text } from "@chakra-ui/react";


interface StepAnnounceProps{
  step: boolean
}

function SelectDifficulty(){
  const [difficulty, setDifficulty] = useAtom(chessDifficulty )
  return(
    <div>
      <Text>{difficulty}</Text>
    <div>
      <Button onClick={()=>{setDifficulty(GameDifficulty.easy)}}>Легко</Button>
      <Button onClick={()=>{setDifficulty(GameDifficulty.medium)}}>Средне</Button>
      <Button onClick={()=>{setDifficulty(GameDifficulty.hard)}}>Сложно</Button>
    </div>
    </div>
  )
}

function StepAnnounce(props: StepAnnounceProps){

  return (
    <>
    {props.step ?
    <div>
      <Progress size='xs' isIndeterminate />
      <Text>Ассистент думает</Text>
    </div>
    :
    <Text>Твой ход</Text> 
    }
  </>
  )
}

interface GameMove{
  from: string,
  to: string,
  promotion: string,
}

interface ChessServerResponse{
  game_move: GameMove
}

const initialFen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
  

export function ChessBox() {
  const [difficulty] = useAtom(chessDifficulty)
  const [gameState, setGameState] = useAtom(gameResult)
  const [game, setGame] = useState(new Chess(window.sessionStorage.getItem("game")??''));
  const [{ data, loading, error }, botDecision] = useChessApi<ChessServerResponse[]>(
    CHESS_ROUTES.MOVE,{manual: true}
  )

  function makeAMove(move: GameMove) {
    console.log(move)
    window.sessionStorage.setItem("game", game.fen());
    const gameCopy = { ...game };
    const result = gameCopy.move(move);
    setGame(gameCopy);
    return result; // null if the move was illegal, the move object if the move was legal
  }

  function selectMove(moves: ChessServerResponse[]){
    switch (difficulty){
      case GameDifficulty.easy: 
        return moves[moves.length-1].game_move
      case GameDifficulty.medium: 
        return moves[1].game_move
      case GameDifficulty.hard: 
        return moves[0].game_move
    }
  } 

  async function botMove() {
    const possibleMoves = game.moves();
    if (game.game_over() || game.in_draw() || possibleMoves.length === 0){

      if (game.in_checkmate()){
        if (game.turn() == 'b'){
          setGameState(GameResult.WIN)
        }
        else{
          setGameState(GameResult.LOSE)
        }
      }

      if (game.in_draw()){
        setGameState(GameResult.DRAW)
      }

      return
    }

    botDecision({
      data: {
        fen_state: game.fen()
      },
    }).then(
      async (r) => {
        const result = await r
        console.log(result.data)
        const assistant_move = selectMove(result.data)
        makeAMove(assistant_move);
      }
    ).catch((e)=>console.log(e))

    
  }

  function onDrop(sourceSquare: string, targetSquare: string) {
    const move = makeAMove({
      from: sourceSquare,
      to: targetSquare,
      promotion: "q", // always promote to a queen for example simplicity
    });

    // illegal move
    if (move === null) return false;
    botMove();
    return true;
  }

  return (
    <div className="Chess">
      <StepAnnounce step={loading}/>
      <SelectDifficulty/>
      <Button onClick={()=>{game.reset();setGame(game)}}>Reset</Button>
      <Text>{gameState}</Text>
      <Chessboard 
        position={game.fen()} 
        onPieceDrop={onDrop} 
        customDarkSquareStyle={{ backgroundColor: "#779952" }}
        customLightSquareStyle={{ backgroundColor: "#edeed1" }}
        customBoardStyle={{
            borderRadius: "4px",
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.5)",
        }}
      />
    </div>
  )
}