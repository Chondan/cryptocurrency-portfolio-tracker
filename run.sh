network=$1
infura_project_id=$2

REACT_APP_INFURA_ENDPOINT="https://${network}.infura.io/v3/${infura_project_id}";
echo "REACT_APP_INFURA_ENDPOINT=${REACT_APP_INFURA_ENDPOINT}" > .env
python3 ./src/utils/contractsScrapping.py $network;
npm start;