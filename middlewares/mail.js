/**
 * Middleware mail
 *
 * Reliza o envio de e-mails.
 *
 * @author André Luiz Haag <andreluizhaag@gmail.com>
 * @license LICENSE.md
 */

/**
 * Dependencies
 */
var nodemailer = require('nodemailer');


module.exports.send = function(req, res, next, options, cb) {
  //var opt = processOptions(options);
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'discoverytecnologiateste@gmail.com',
      pass: 'dfvb1q2w3e@'
    }
  }, {
    // default values for sendMail method
    from: 'discoverytecnologiateste@gmail.com'
    /*headers: {
        'My-Awesome-Header': '123'
    }*/
  });
  // send mail
  transporter.sendMail({
      to: 'receiver@address',
      subject: 'hello',
      text: 'hello world!'
  });
  return cb(null, imgs);
};
