#!/bin/bash
#
# Funcoes comuns que sao utilizadas por outras scripts
#
# Autor: Andre Luiz Haag
# Criado em: 11/06/2016
# See: https://google.github.io/styleguide/shell.xml

# Variaveis globais
# -------------------------------------
BASE_PATH="`pwd`"

#######################################
# Checagem de nivel de usuário. Apenas root ou execucao com sudo eh permitida
# Arguments:
#   None
# Returns:
#   None
#######################################
function checkUserIsAdmin ()
{
  if [ $UID != "0" ]; then
    message "Permissao de root necessária para execução!" --error
    message "Tente executar com prefixo 'sudo'" --info
    exit 0
  fi
}

#######################################
# Mostra o cabecalho inicial de boas vindas
# Arguments:
#   None
# Returns:
#   None
#######################################
function welcomeShow ()
{
  clear
  whiptail --title "Bem vindo" --msgbox "`cat files/welcome.txt`" --ok-button "Continuar" 20 70
}

#######################################
# Abandona a aplicacao quando solicitado pelo usuario ESC no whiptail
# Arguments:
#   None
# Returns:
#   None
#######################################
function verifyUserCancel ()
{
  status=$1
  if [ $status == 255 ]; then
    message "Cancelado pelo usuário!" --info
    exit 0
  fi
}

#######################################
# Funcao para exibicao de mensagens ao usuario no terminal.
# Exemplo de uso:
# message "Teste de mensagem" --success
# Arguments:
#   $1 Conteudo a ser exibido
#   $2 Tipo -<info|success|warning|error>
# Returns:
#   string
#######################################
function message ()
{
  text="$1"
  type=${2:---info}

  case $type in
    --info)    color " [Info] ${text} " --white --black --bold ;;
    --success) color " [OK] ${text} " --white --green --bold ;;
    --warning) color " [Alert] ${text} " --white --yellow --bold ;;
    --error)   color " [NOK] ${text} " --white --red --bold ;;
  esac
}

#######################################
# Imprime uma linha de separacao
# Arguments:
#   $1 Conteudo a ser exibido
#   $2 Tipo -<info|success|warning|error>
# Returns:
#   string
#######################################
function printSeparator ()
{
  echo "-------------------------------------------------------------"
}