var express = require('express');
var router = express.Router();
var cielo = require('../lib/cielo.js')

//get compra id e envia send 
router.get('/:compra_id/status', function (req, res, next) {
  cielo.consulta(req.params.compra_id).then((result) => {
    let message = {};
    switch (result.Payment.Status) {
      case 0:
        message = { 'Status': 'NotFinished' };
        break;
      case 1:
        message = { 'Status': 'Authorized' };
        break;
      case 2:
        message = { 'Status': 'Payment Confirmed' };
        break;
      case 3:
        message = { 'Status': 'Denied' };
        break;
      default:
        message = { 'Status': 'Failed' };
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
            "Message": "Done with sucessful",
            "paymentID": paymentID
          });
        }
        else {
          res.status(402).send({
            "Status": "Failed",
            "Message": "Problem with the credit card"
          });
        }

      })
      .catch((erro) => {
        console.error(erro);
      })
  });

});

module.exports = router;
