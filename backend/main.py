import numpy as np
import pandas as pd
from manage_web3 import ManageWeb3
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import json

secrets = {}
with open('mock.json') as f:
    secrets = json.load(f)

link = "https://eth-sepolia.g.alchemy.com/v2/xu-OLKHDxb7nGuGwwnibrgp5Dt-UclQN"
private_key = "832f1bedd5eb36837d2d2032d80d4b68a25ecbd282abed4df59a887501949cb8"
contract_address = ''
abi_file = "./abi.json"

with open(abi_file) as f:
    contract_address = json.load(f)['address']

manager = ManageWeb3({
    'link':link,
    'abi_file':abi_file, 
    'contract_address':contract_address, 
    'private_key':private_key
    })

def getTransactions(manager, id):
    return manager.contract.functions.getUserContracts(id).call({'from': manager.account.address}) 

def calculateMeanPrice(transactions, id):
    df = pd.DataFrame(transactions)
    new_column_names = ['timestamp', 'productId', 'unitPrice', 'local', 'amount', 'active', 'transactionId']
    df.columns = new_column_names
    filtered_df = df[df['productId'] == id]
    if filtered_df.empty:
        return None
    group = filtered_df.groupby('productId')['unitPrice'].mean()
    specific_item = group.get(id)
    print(specific_item)

    return specific_item

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

@app.get("/{stateId}")
async def root(stateId: int):
    return getTransactions(manager, stateId)
# passar lista como parâmetro

@app.get("/hash-table/{num}")
async def getHashTableNum(num: int):
    data_table = []

    with open('hash_table.json') as f:
        data_table = json.load(f)["hashTable"]
    
    resto = num % len(data_table)

    return data_table[resto]


