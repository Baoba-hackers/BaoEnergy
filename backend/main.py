# fastapi app
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
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

# passar lista como parâmetro
@app.get("/calculate/")
async def calculate(values: str):
    # transformar string em lista
    values = values.split(',')
    # transformar lista de string em lista de int
    values = [int(i) for i in values]
    # calcular média
    mean = np.mean(values)

    # return json
    return JSONResponse(content={"mean": mean})
