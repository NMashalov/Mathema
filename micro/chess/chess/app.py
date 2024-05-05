from contextlib import asynccontextmanager
import fastapi
from stockfish import Stockfish
from pydantic import BaseModel,Field
from enum import IntEnum
import uvicorn

fen_regex = r'^([rnbqkpRNBQKP1-8]+\/){7}([rnbqkpRNBQKP1-8]+)\s[bw]\s(-|K?Q?k?q?)\s(-|[a-h][36])\s(0|[1-9][0-9]*)\s([1-9][0-9]*)'
class EloLevel(IntEnum):
    easy=700
    medium=900
    hard=1200


class Chess(BaseModel):
    fen_state: str = Field(pattern=fen_regex)
    difficulty :EloLevel


models = {}

@asynccontextmanager
async def lifespan(app: fastapi.FastAPI):
    # Load the ML model
    models['stockfish'] = Stockfish(path="./stockfish-ubuntu-x86-64-avx2", depth=18, parameters={"Threads": 2, "Minimum Thinking Time": 30}) 
    yield
    # Clean up the ML models and release the resources
    models.clear()

    
app = fastapi.FastAPI(lifespan=lifespan)


@app.post('/move')
def return_top_moves(req: Chess):
    stockfish: Stockfish = models['stockfish']
    if stockfish.is_fen_valid(req.fen_state):
        stockfish.set_fen_position(req.fen_state)
        stockfish.set_elo_rating(req.difficulty)
        return stockfish.get_top_moves(3) 
    else:
        raise fastapi.HTTPException(status_code=404, detail=f"Wrong FEN. {stockfish.get_fen_position()}")


def start():
    uvicorn.run(app,host="0.0.0.0",port=3000)
if __name__ == '__main__':
    start()