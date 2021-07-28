const axios = require('axios');

class pagarme {

    static compra(params) {
        return axios.post('https://api.pagar.me/1/transactions', params)
            .catch((error) => {
                console.log(error);
            });
    }
    static captura(paymentId, amount) {
        return axios.post('https://api.pagar.me/1/transactions/' + paymentId + '/capture', {
            amount: amount,
            api_key: "ak_test_ZO3JQJmqwe07uDB0favmlh3mYMSnI6"
        })
            .catch((error) => {
                console.log(error);
            });
    }
    static consulta(paymentId) {
        return axios.get('https://api.pagar.me/1/transactions/' + paymentId, {
            params: {
                api_key: "ak_test_ZO3JQJmqwe07uDB0favmlh3mYMSnI6"
            }
        })
    }
}
module.exports = pagarme;