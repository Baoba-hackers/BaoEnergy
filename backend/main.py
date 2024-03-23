#fast api app
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import json
import numpy as np

app = FastAPI()

origins = [
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

#passar lista como parametro
@app.get("/calculate/{values}")
async def calculate(values: int):
    #transformar string em lista
    values = values.split(',')
    #transformar lista de string em lista de int
    values = [int(i) for i in values]
    #calcular media
    mean = np.mean(values)

    #return json
    return JSONResponse(content={"mean": mean})


