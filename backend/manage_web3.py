from web3 import Web3
from web3 import Account
import json

class ManageWeb3:
    def __init__(self, args):
        if (args['private_key']):
            self.connectToAExistingAccount(args['link'], args['abi_file'], args['contract_address'], args['private_key'])
        else:
            self.createANewAccount(args['link'], args['abi_file'], args['contract_address'])
            
    def createNewAccount(self, link, abi_file, contract_address):
        self.link = link
        self.abi_file = abi_file
        self.w3 = self.connectToWeb3()
        self.contract = self.loadContract(contract_address)
        self.account = self.createANewAccount()
        
        balance = self.w3.eth.get_balance(self.account.address) 
        print(f"Loaded account: {self.account.address}")
        print(f"Account balance: {self.w3.from_wei(balance, 'ether')} ETH")

    def connectToAExistingAccount(self, link, abi_file, contract_address, private_key):
        self.link = link
        self.abi_file = abi_file
        self.w3 = self.connectToWeb3()
        self.contract = self.loadContract(contract_address)
        self.account = Account.from_key(private_key)
        
    def connectToWeb3(self):
        self.w3 = Web3(Web3.HTTPProvider(self.link))
        if self.w3.is_connected():
            print("-" * 50)
            print("Connection Successful to W3 was sucessful")
            print("-" * 50)
        else:
            raise NameError("Connectionto W3 Failed")

        return self.w3

    def loadContract(self, contract_address):
        with open(self.abi_file) as f:
            info_json = json.load(f)
        contract_abi = info_json["abi"]

        contract =  self.w3.eth.contract(address=contract_address, abi=contract_abi)
        return contract

    def getANonViewFunction(self, contract_function):
        Chain_id = self.w3.eth.chain_id
        # contract_function = contract.functions.function_name
        call_function = contract_function().buildTransaction({
            "chainId": Chain_id, 
            "from": self.account.address, 
            "nonce": self.w3.eth.get_transaction_count(self.account.address)
        })
        signed_tx = self.w3.eth.account.sign_transaction(call_function, private_key=self.private_key)
        send_tx = self.w3.eth.send_raw_transaction(signed_tx.rawTransaction)
        tx_receipt = self.w3.eth.wait_for_transaction_receipt(send_tx)
        print(tx_receipt) 
        return tx_receipt

    def createANewAccount():    
        account = Account.create() 
        print(f"New account created: {account.address}")
        print(f"Private key: {account._private_key.hex()}")
        return account
