# Decentraland Dapps Boilerplate

## How to use

```bash
# clone the repo
# if you're building a pure dapp you can remove everything except the webapp/ folder

$ npm install # in both src/ and webapp/ folders

# create and fill .env files variables. Example below, based on the .env.example files

# If you're using the server
# create a pg database
$ createuser dapp_user
$ createdb -O dapp_user super_dapp
$ npm run migrate up

$ npm start # in both src/ and webapp/ folders
```

## ENV example

**src/**

```
NODE_ENV=development

SERVER_PORT=5000

CONNECTION_STRING="postgres://localhost:5432/super_app"

# Ropsten
MANA_TOKEN_CONTRACT_ADDRESS=0x2a8fd99c19271f4f04b1b7b9c4f7cf264b626edb
LAND_REGISTRY_CONTRACT_ADDRESS=0x7a73483784ab79257bb11b96fd62a2c3ae4fb75b

# Mainnet
# LAND_REGISTRY_CONTRACT_ADDRESS=0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d
# MANA_TOKEN_CONTRACT_ADDRESS=0x0f5d2fb29fb7d3cfee444a200298f468908cc942
```

**webapp/**

```
NODE_PATH=src/
NODE_ENV=development

REACT_APP_PROVIDER_URL=https://ropsten.infura.io/

REACT_APP_API_URL=http://localhost:5000

# Ropsten
REACT_APP_LAND_REGISTRY_CONTRACT_ADDRESS=0x7a73483784ab79257bb11b96fd62a2c3ae4fb75b
REACT_APP_MANA_TOKEN_CONTRACT_ADDRESS=0x2a8fd99c19271f4f04b1b7b9c4f7cf264b626edb

# Mainnet
# REACT_APP_LAND_REGISTRY_CONTRACT_ADDRESS=0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d
# REACT_APP_MANA_TOKEN_CONTRACT_ADDRESS=0x0f5d2fb29fb7d3cfee444a200298f468908cc942
```

