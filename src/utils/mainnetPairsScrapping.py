import requests
from bs4 import BeautifulSoup
import json
import os

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

networks = soup.findAll('div', { 'class': 'rdmd-table'})
# return array of networks -> [Mainnet, Kovan, Rinkeby]

mainnet = networks[0]
mainnetBody = mainnet.find_all('tbody')[0]
mainnetRows = mainnetBody.find_all('tr')

# Need to extract Pain and Proxy
mainnetDict = {}
for row in mainnetRows:
	[pairElem, proxyElem] = row
	pairTxt = pairElem.text
	proxyTxt = proxyElem.text
	mainnetDict[pairTxt] = proxyTxt

dir_path = os.path.dirname(os.path.realpath(__file__))

# Export to JSON file
with open(f'{dir_path}/mainnetPairs.json', 'w') as outfile:
	json.dump(mainnetDict, outfile)