#!/bin/bash
#
# Cria/configura ambiente de desenvolvimento.
# IMPORTANTE: Deve ser executada a partir da raiz do projeto
#
# Autor: Andre Luiz Haag
# See: https://google.github.io/styleguide/shell.xml

# includes
# -------------------------------------
. bin/includes/colors.sh
. bin/includes/common.sh

#######################################
# Instala/atualiza dependencias NPM
# Arguments:
#   None
# Returns:
#   None
#######################################
function installNPMPackages()
{
  message "Instalando/atualizando NPM packages(package.json)." --info
  npm install
  exitStatus=$?
  if [ $exitStatus == 0 ]; then
    message "Dependências instaladas/atualizadas com sucesso." --success
  else
    message "Não foi possível instalar/atualizar dependênciaas." --error
  fi
}

#######################################
# Instala/atualiza dependencias NPM
# Arguments:
#   None
# Returns:
#   None
#######################################
function initDataBase()
{
    message "Importando dados para o MongoDB." --info
    #mongoimport --jsonArray --db dsc-api-address --collection users --drop --file ${BASE_PATH}/data/mongodb/users.json
    mongoimport --jsonArray --db dsc-api-address --collection Address --drop --file ${BASE_PATH}/data/mongodb/address.json
    message "Importação finalizada." --info
}

#
# Main
# #########################################
echo $BASE_PATH
printSeparator
installNPMPackages
printSeparator
initDataBase

