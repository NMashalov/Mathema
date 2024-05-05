FROM python:3.11

WORKDIR /work

# folder copying is tricky. Point folder name
COPY ./chess /work/chess
COPY README.md poetry.lock  pyproject.toml stockfish-ubuntu-x86-64-avx2 /work/

RUN pip install poetry && poetry install

ENTRYPOINT poetry run start