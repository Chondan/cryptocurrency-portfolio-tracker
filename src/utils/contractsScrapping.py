import requests
from bs4 import BeautifulSoup
import json
import os
import sys

headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '3600',
    'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:52.0) Gecko/20100101 Firefox/52.0'
    }
url = "https://docs.chain.link/docs/ethereum-addresses"
req = requests.get(url, headers)
soup = BeautifulSoup(req.content, 'html.parser')

networks = soup.findAll('div', { 'class': 'rdmd-table'}) # return array of networks -> [Mainnet, Kovan, Rinkeby]

def getContracts(network):
    networkBody = network.find_all('tbody')[0]
    networkRows = networkBody.find_all('tr')

    # Need to extract Pain and Proxy
    contracts = {}
    for row in networkRows:
        [pairElem, proxyElem] = row
        pairTxt = pairElem.text
        proxyTxt = proxyElem.text
        contracts[pairTxt] = proxyTxt
    return contracts

def generateJSON(data, filename):
    # Export to JSON file
    dir_path = os.path.dirname(os.path.realpath(__file__))
    with open(f'{dir_path}/{filename}', 'w') as outfile:
    	json.dump(data, outfile)

# Networks
networksDict = { 'mainnet': 0, 'kovan': 1, 'rinkeby': 2 }
[_, networkName] = sys.argv

generateJSON(getContracts(networks[networksDict[networkName]]), 'contracts.json')