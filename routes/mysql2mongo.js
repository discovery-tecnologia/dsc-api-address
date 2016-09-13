var express = require('express');
var mysql   = require('mysql');
var sprintf = require("sprintf-js").sprintf;
var async   = require("async");
//var _       = require('underscore');
var fs      = require('fs');
var router = express.Router();
var mysqlConfig = {
  host: 'localhost',
  user: 'discovery',
  password : 'dfvb1q2w3e@',
  port : 3306,
  database:'001_encontrepecas'
};

/**
 * @api {GET} / Teste de conectividade
 *
 * @apiDescription URL de teste para verificação de conectividade com a API.
 * @apiGroup Teste
 * @apiPermission none
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *     "success" : "API acessada com sucesso."
 *   }
 */
router.get('/', function(req, res, next) {

  // Faixas de CEP por UF (min: 1000000, max: 89999999, qtd: 88999999):
  // -----------------------------------------------
  // AC	69900-000 a 69999-999
  // AL 57000-000 a 57999-999
  // AM 69000-000 a 69299-999, 69400-000 a 69899-999
  // AP	68900-000 a 68999-999
  // BA	40000-000 a 48999-999
  // CE	60000-000 a 63999-999
  // DF	70000-000 a 72799-999, 73000-000 a 73699-999
  // ES 29000-000 a 29999-999
  // GO	72800-000 a 72999-999, 73700-000 a 76799-999
  // MA	65000-000 a 65999-999
  // MG	30000-000 a 39999-999
  // MS	79000-000 a 79999-999
  // MT	78000-000 a 78899-999
  // PA	66000-000 a 68899-999
  // PB	58000-000 a 58999-999
  // PE	50000-000 a 56999-999
  // PI	64000-000 a 64999-999
  // PR	80000-000 a 87999-999
  // RJ	20000-000 a 28999-999
  // RN	59000-000 a 59999-999
  // RO	76800-000 a 76999-999
  // RR	69300-000 a 69399-999
  // RS	90000-000 a 99999-999
  // SC	88000-000 a 89999-999
  // SE	49000-000 a 49999-999
  // SP	01000-000 a 19999-999
  // TO	77000-000 a 77999-999

  // 849343 aproximadamente 10 dias
  //------------------------------------------------
  // Obs: especificação por cidade pode ser obtida em
  // http://www.buscacep.correios.com.br/sistemas/buscacep/buscaFaixaCep.cfm

  var db = mysql.createConnection(mysqlConfig);

  db.connect(function(err) {
    if (err) throw err;
  });

  var sql = "SELECT cep FROM 001_encontrepecas.endereco;";

  db.query(sql, function(err, rows, fields) {
    if (err) throw err;

    writeAddressFile('[' + '\n');

    var sql = "SELECT e.cep, e.endereco_completo as logradouro, b.nome as bairro, c.nome as localidade, u.uf as uf \
                  FROM 001_encontrepecas.endereco e \
                  INNER JOIN 001_encontrepecas.bairro b ON b.id = e.bairro_id \
                  INNER JOIN 001_encontrepecas.cidade c ON c.id = b.cidade_id \
                  INNER JOIN 001_encontrepecas.uf u ON u.id = c.uf_id \
                  WHERE e.CEP = '%s';";

    async.eachSeries(rows, function (row, callback) {
      var cep = row.cep;
      db.query(sprintf(sql, cep), function(err, rows, fields) {
        if (err) throw err;

        if (rows.length > 0 && typeof rows[0] !== 'undefined') {
          var address = JSON.stringify(rows[0]);
          console.log(address);
          // escreve no arquivo
          writeAddressFile(address + ',\n');
        } else {
          console.error(sprintf('CEP %s não encontrado', strCep));
        }
        callback(); // tell async that the iterator has completed
      });

    }, function(err) {
      console.log('Iterating done');
      writeAddressFile(']');
      db.end();
      return res.status(200).json({'status':'ok'});
    });

  });

});

/**
 * Completa um número com zeros com zeros a esquerda até atingir a
 * quantidade de caracteres determinada.
 *
 * @param num Numero original a ser manipulado.
 * @param places Quantidade final de dígitos que deverá possuir.
 * @returns {string}
 */
/*var zeroPad = function (num, places) {
  var zero = places - num.toString().length + 1;
  return Array(+(zero > 0 && zero)).join("0") + num;
};*/

/**
 * Escreve conteúdo no arquivo de collections de endereços.
 * @param content
 */
var writeAddressFile = function(content, callback) {
  content = content || "";
  fs.appendFile(__dirname + '/../data/mongodb/address.json', content, function (err) {
    if (err) throw err;
  });
};

module.exports = router;
