# Endereço API
API restfull para consulta de endereços com autenticação por JWT(JSON Web Token)

Consulta o serviço https://viacep.com.br/ e realiza fallback para base de dados dos Correios em MySQL em caso de falha/indisponibilidade do serviço ViaCEP.

Como diferencial, armazena últimos consultas em cache para aumentar o desempenho de consultas mais frequentes.

## Ambiente de desenvolvimento
Instalar as dependências do NPM:
```shell
$ npm install
```

Para executar API é preciso ter o **NodeJS** instalado e executar a partir da raiz do projeto:
```shell
$ node bin/www
```

Para verificar o funcionamento faça um GET no endereço:
```
http://127.0.0.1:3001 
```

## Documentação da API
A documentação é gerada automaticamente por meio do gerenciador de tarefas Gulp:
```shell
$ gulp apidoc
```

Para acesso a documentação gerada em ambiente de desenvolvimento basta executar a API e acessar o endereço: 
```
http://127.0.0.1:3001/doc 
```

Mais detalhes sobre o funcionamento podem ser vistos na documentação do [APIDOC](http://apidocjs.com/) .

## Deploy
Descrever procedimento de deploy...