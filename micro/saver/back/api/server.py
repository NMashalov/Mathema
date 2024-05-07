from fastapi import FastAPI, File, UploadFile, Response, status
from pathlib import Path
from fastapi.middleware.cors import CORSMiddleware
from rq import Queue
from rq.job import Job
from redis import Redis
import namesgenerator
import logging
import os
from contextlib import asynccontextmanager
from dataclasses import dataclass
import uvicorn
from fastapi.responses import JSONResponse


from .worker import ocr


@dataclass 
class AppState:
    client: Redis 
    queue: Queue


state = None

@asynccontextmanager
async def init_state(app: FastAPI):
    client =Redis(
        host=os.getenv('REDIS_HOST','localhost'),
        port=os.getenv('REDIS_PORT','6379')
    )
    logging.info(client.ping())
    queue = Queue(connection=client)
    global state
    state = AppState(client= client,queue = queue)
    yield
    del state


app = FastAPI(title="Nougat API",lifespan=init_state,root_path='/api')


app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    """Health check."""
    return {
        "status-code": 200,
        "data": {},
    }

@app.post("/ocr")
async def predict(
    file: UploadFile = File(...)
) -> str:
    semantic_task_id = namesgenerator.get_random_name()
    state.queue.enqueue(ocr, file, job_id=semantic_task_id)
    return semantic_task_id


@app.get("/cancel/{task_id}")
async def cancel(task_id:str):
    try:
        job = Job.fetch(task_id, connection=state.client)
        job.cancel()
        return {
            'result': job.result,
            'status': job.get_status()
        }
    except Exception as e:
        logging.info(f'Invalid request. {task_id=}. {e}')
        return JSONResponse(
            status_code=418,
            content={"error": e},
        )

@app.get("/status/{task_id}")
async def status(
    task_id: str,
):
    try:
        job = Job.fetch(task_id, connection=state.client)
        return {
            'result': job.result,
            'status': job.get_status()   
        }
    except Exception as e:
        logging.info(f'Invalid request {task_id=}. {e}')
        return JSONResponse(
            status_code=418,
            content={"error": e},
        )


def start():
    uvicorn.run(
        app, 
        host=os.getenv('APP_HOST','localhost'),
        port=int(os.getenv('APP_PORT',3000))
    )

