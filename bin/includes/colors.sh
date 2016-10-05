#!/bin/bash
#
# Script responsável por formatar e colorir saidas printadas no terminal.
#
# Autor: Andre Luiz Haag
# Criado em: 04/10/2016
# See: https://google.github.io/styleguide/shell.xml

#######################################
# Exibe exemplos de textos com as cores disponíveis.
# \033[<0-normal|1-bold>;<foreground>[background]m
# Arguments:
#   None
# Returns:
#   None
#######################################
function testColors ()
{
  echo -e " \033[0;30m Preto  \033[0m             --> 0;30 "
  echo -e " \033[0;31m Vermelho  \033[0m          --> 0;31 "
  echo -e " \033[0;32m Verde  \033[0m             --> 0;32 "
  echo -e " \033[0;33m Marrom  \033[0m            --> 0;33 "
  echo -e " \033[0;34m Azul  \033[0m              --> 0;34 "
  echo -e " \033[0;35m Purple  \033[0m            --> 0;35 "
  echo -e " \033[0;36m Cyan  \033[0m              --> 0;36 "
  echo -e " \033[0;37m Cinza Claro  \033[0m       --> 0;37 "
  echo -e " \033[1;30m Preto Acinzentado \033[0m  --> 1;30 "
  echo -e " \033[1;31m Vermelho Claro  \033[0m    --> 1;31 "
  echo -e " \033[1;32m Verde Claro  \033[0m       --> 1;32 "
  echo -e " \033[1;33m Amarelo \033[0m            --> 1;33 "
  echo -e " \033[1;34m Azul  Claro \033[0m        --> 1;34 "
  echo -e " \033[1;35m Purple Claro  \033[0m      --> 1;35 "
  echo -e " \033[1;36m Cyan  Claro \033[0m        --> 1;36 "
  echo -e " \033[1;37m Branco  \033[0m            --> 1;37 "

  echo -e " \033[40;1;37m Fundo Preto    \033[0m     --> 40;?;? "
  echo -e " \033[41;1;37m Fundo Vermelho \033[0m     --> 41;?;? "
  echo -e " \033[42;1;37m Fundo Verde    \033[0m     --> 42;?;? "
  echo -e " \033[43;1;37m Fundo Marrom   \033[0m     --> 43;?;? "
  echo -e " \033[44;1;37m Fundo Azul     \033[0m     --> 44;?;? "
  echo -e " \033[45;1;37m Fundo Purple   \033[0m     --> 45;?;? "
  echo -e " \033[46;1;37m Fundo Cyan     \033[0m     --> 46;?;? "
  echo -e " \033[47;1;37m Fundo Cinza    \033[0m     --> 47;?;? "

  echo -e " \033[4;37m Sublinhado  \033[0m        --> 4;? "

  color "Teste de texto" --white --yellow --bold
}

#######################################
# Aplica cores de rosto, fundo e estilos ao texto.
# Arguments:
#   $1 Texto a ser colorido
#   $2 Foreground color --<black|red|green|yellow|blue|magenta|cyan|white>
#   $3 Background color --<black|red|green|yellow|blue|magenta|cyan|white>
#   $4 Estilo da fonte  --<normal|bold|underline>
# Returns:
#   string
#######################################
function color()
{
  # obtem parametros
  text="$1"
  foreground=${2:---default}
  background=${3:---default}
  style=${4:---normal}

  case $foreground in
    --black)   foreground="30" ;;
    --red)     foreground="31" ;;
    --green)   foreground="32" ;;
    --yellow)  foreground="33" ;;
    --blue)    foreground="34" ;;
    --magenta) foreground="35" ;;
    --cyan)    foreground="36" ;;
    --white)   foreground="37" ;;
  esac

  case $background in
    --black)   background="40" ;;
    --red)     background="41" ;;
    --green)   background="42" ;;
    --yellow)  background="43" ;;
    --blue)    background="44" ;;
    --magenta) background="45" ;;
    --cyan)    background="46" ;;
    --white)   background="47" ;;
  esac

  case $style in
    --normal)    style="0" ;;
    --bold)      style="1" ;;
    --underline) style="4" ;;
  esac

  echo -e "\033[${background};${style};${foreground}m${text}\033[0m"
}