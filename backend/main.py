import numpy as np
import pandas as pd
from manage_web3 import ManageWeb3
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import json

secrets = {}
with open('mock.json') as f:
    secrets = json.load(f)

link = "https://sepolia-rpc.scroll.io/"
private_key = secrets['config']["privateKey"]
contract_address = ''
abi_file = "./abi.json"

with open(abi_file) as f:
    contract_address = json.load(f)['address']

manager = ManageWeb3({
    'link':link, 
    'abi_file':abi_file, 
    'contract_address':abi_file, 
    'private_key':private_key
    })

def getTransactions(manager):
    return manager.contract.functions.getAveragePrice().call({'from': manager.account.address}) 

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

@app.get("/")
async def root():
    return getTransactions(manager)
# passar lista como parâmetro
