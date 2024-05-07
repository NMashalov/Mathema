import ocrmypdf
from pathlib import Path
import json

def ocr_variant(year:int,variant:int):
    Path(f'./searchable_pdfs/{year}').mkdir(parents=True,exist_ok=True)
    ocrmypdf.ocr(f'./pdfs/{year}/{variant:02d}.pdf', f'./searchable_pdfs/{year}/{variant:02d}.pdf', l='rus',deskew=True)


def ocr():
    with Path('./logs/results.jsonl').open('r') as f:
        requests = json.loads(f.read())

    for r in requests:
        if not r['ocr']:
            ocr_variant(r['year'],r['variant'])
            r['ocr']=True




