var express = require('express');
var router = express.Router();
var cielo = require('../lib/cielo.js')

//get compra id e envia send 
router.get('/:compra_id/status', function (req, res, next) {
  cielo.consulta(req.params.compra_id).then((result) => {
    let message = {};
    switch (result.Payment.Status) {
      case 0:
        message = { 'Method':'Cielo','Status': 'NotFinished' };
        break;
      case 1:
        message = {'Method':'Cielo', 'Status': 'Authorized' };
        break;
      case 2:
        message = {'Method':'Cielo', 'Status': 'Payment Confirmed' };
        break;
      case 3:
        message = {'Method':'Cielo', 'Status': 'Denied' };
        break;
      default:
        message = {'Method':'Cielo', 'Status': 'Failed' };
    }
    res.send(message);
  })
});

// Post send sempre que chega em /compras
router.post('/', function (req, res, next) {

  cielo.compra(req.body).then((result) => {
    const paymentID = result.Payment.PaymentId;
    cielo.captura(paymentID)
      .then((result) => {
        if (result.Status == 2) {
          res.status(201).send({
            "Status": "Sucessful",
            "Message": "Done with sucessful by Cielo",
            "paymentID": paymentID
          });
        }
        else {
          res.status(402).send({
            "Status": "Failed",
            "Message": "Problem with the credit card by Cielo"
          });
        }

      })
      .catch((erro) => {
        console.error(erro);
      })
  });

});

module.exports = router;
