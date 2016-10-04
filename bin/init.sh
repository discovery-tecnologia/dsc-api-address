#! /bin/bash
echo 'Importando dados...';
BASE_PATH=`pwd`
echo $BASE_PATH
#mongoimport --jsonArray --db dsc-api-address --collection users --drop --file ${BASE_PATH}/data/mongodb/users.json
mongoimport --jsonArray --db dsc-api-address --collection Address --drop --file ${BASE_PATH}/data/mongodb/address.json
echo 'Finalizado!'