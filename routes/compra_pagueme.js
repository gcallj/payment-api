var express = require('express');
var router = express.Router();
var pagarme = require('../lib/pagarme.js')

//get compra id e envia send 
router.get('/:compra_id/status', function (req, res, next) {
  pagarme.consulta(req.params.compra_id).then((result) => {
    let message = {};
    switch (result.data.status) {
      case 'processing':
        message = { 'Method':'Pague-me','Status': 'NotFinished' };
        break;
      case 'paid':
        message = { 'Method':'Pague-me','Status': 'Authorized and paid' };
        break;
      default:
        message = { 'Method':'Pague-me','Status': 'Failed' };
    }
    res.send(message);
  })
});

// Post send sempre que chega em /compras
router.post('/', function (req, res, next) {

  pagarme.compra(req.body).then((result) => {
    const paymentID = result.data.id;
    const amount = result.data.amount;
    pagarme.captura(paymentID, amount)
      .then((result) => {
        if (result.data.status == "paid") {
          res.status(201).send({
            "Status": "Sucessful",
            "Message": "Done with sucessful by Pague-me",
            "paymentID": paymentID
          });
        }
        else {
          res.status(402).send({
            "Status": "Failed",
            "Message": "Problem with the credit card by Pague-me"
          });
        }
      })
      .catch((erro) => {
        console.error(erro);
      })
  });

});

module.exports = router;
