
import asyncio
from pathlib import Path
import httpx
import itertools
import logging
import os
import json
import time


async def download_kvant_by_year_and_variant(client: httpx.AsyncClient,year:int,variant:int):
    r = await client.get(f'https://kvant.ras.ru/djvu/{year}_{variant:02d}.djvu')
    if r.status_code!=200:
        raise Exception(f'No {year}_{variant:02d}')
    return r.content

async def octet_to_pdf(octet,year,variant):
    Path(f'./pdfs/{year}').mkdir(parents=True,exist_ok=True)
    proc = await asyncio.create_subprocess_shell(
        f"ddjvu -format=pdf -quality=85 -verbose  - ./pdfs/{year}/{variant:02d}.pdf",
        stdin=asyncio.subprocess.PIPE,
    )

    await proc.communicate(input = octet)

async def load_worker(id: int,in_q: asyncio.Queue,out_q:asyncio.Queue):
    async with httpx.AsyncClient() as cli:
        while True:
            start = time.time()
            r = await in_q.get()
            year,variant = r['year'], r['variant']
            octet = await download_kvant_by_year_and_variant(cli,year,variant)
            r['octet'] = octet
            end = time.time()
            r['time'] +=end-start
            await out_q.put(r)
            in_q.task_done()


async def djvu_worker(id: int,in_q: asyncio.Queue,out_q:asyncio.Queue):
    while True:
        r = await in_q.get()
        start = time.time()
        year,variant,octet = r['year'], r['variant'],r['octet']
        octet = await octet_to_pdf(octet,year,variant)
        del r['octet']
        end = time.time()
        r['time'] = end-start
        await out_q.put(r)
        in_q.task_done()



async def octet_to_pdf(octet,year,variant):
    Path(f'pdfs/{year}').mkdir(parents=True,exist_ok=True)
    proc = await asyncio.create_subprocess_shell(
        f"ddjvu -format=pdf -quality=85 -verbose  - pdfs/{year}/{variant:02d}.pdf",
        stdin=asyncio.subprocess.PIPE,
    )

    await proc.communicate(input = octet)

def make_tasks():
    return [
        {
            'year': year,
            'variant': variant,
            'path': f"./pdfs/{year}/{variant}",
            'time': 0,
            'ocr': False,
        }
        for year, variant in itertools.product(range(1970,1980),range(1,13))
    ]

async def q_monitoring(q: asyncio.Queue):
    while True:
        await asyncio.sleep(3)
        logging.info(q.qsize())


async def job(index=2):

    tasks = make_tasks()
    in_q = asyncio.Queue(maxsize=3)
    d_q = asyncio.Queue(maxsize=2)
    out_q = asyncio.Queue()

    # init_workers

    load_workers = [asyncio.create_task(load_worker(worker_id, in_q,d_q)) for worker_id in range(3)]
    djvu_workers = [asyncio.create_task(djvu_worker(worker_id, d_q,  out_q )) for worker_id in range(2)]
    mon_workers = [asyncio.create_task(q_monitoring(out_q))]

    for task in tasks[:index]:
        await in_q.put(task)

    await in_q.join()
    await d_q.join()

    for category in [load_workers, djvu_workers,mon_workers]:
        for task in category:
            task.cancel()

    p = Path('./logs')
    p.mkdir(exist_ok=True)
    with (p / 'results.jsonl').open('w') as f:
        print(json.dumps(list(out_q._queue)),file=f)


def start():
    logging.basicConfig(level=logging.DEBUG)
    num_task = int(os.getenv('NUM_TASK',2))
    asyncio.run(job(num_task))
 