network=$1
infura_project_id=$2

[ -e .env ] && rm .env;
REACT_APP_INFURA_ENDPOINT="https://${network}.infura.io/v3/${infura_project_id}";
echo "REACT_APP_INFURA_ENDPOINT=${REACT_APP_INFURA_ENDPOINT}" >> .env;
echo "REACT_APP_NETWORK=${network}" >> .env;