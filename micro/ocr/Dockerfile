FROM python:3.11

WORKDIR /work

RUN apt update && apt install -y imagemagick  tesseract-ocr tesseract-ocr-rus djvulibre-bin

COPY ./ocr /work/ocr
COPY README.md poetry.lock  pyproject.toml /work/

RUN pip install poetry && poetry install

ENTRYPOINT poetry run start && poetry run ocr


