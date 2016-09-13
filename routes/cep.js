var express = require('express');
var router = express.Router();

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
router.get('/:cep', function(req, res, next) {

  /*
   SELECT e.cep, e.endereco_completo as logradouro, b.nome as bairro, c.nome as localidade, u.uf as uf
   FROM 001_encontrepecas.endereco e
   INNER JOIN 001_encontrepecas.bairro b ON b.id = e.bairro_id
   INNER JOIN 001_encontrepecas.cidade c ON c.id = b.cidade_id
   INNER JOIN 001_encontrepecas.uf u ON u.id = c.uf_id
   WHERE e.CEP = '88131-670';
   */

  var cep = req.params.cep;
  // remove ifens(-) do cep
  cep = cep.replace('-', '');

  /*req.getConnection(function(err,connection){
    connection.query('SELECT * FROM endereco WHERE cep="88131-670"',[],function(err,result){
      if(err) return res.status(400).json(err);

      return res.status(200).json(result);

    });
  });*/

  var request = require('request');
  request({
    uri: 'https://viacep.com.br/ws/'+cep+'/json/',
    method: 'GET',
    timeout: 500,
    //followRedirect: true,
    //maxRedirects: 10
  }, function (error, response, body) {
    console.log(error);
    console.log(response);
    console.log(body);
    if (!error && response.statusCode == 200) {
      //console.log(body);
      return res.status(200).json(JSON.parse(body));
    }
  });


});


// get /cep/88131-670
// retorna endereco completo por CEP

// get /uf
// lista ufs

// get /uf/


module.exports = router;
