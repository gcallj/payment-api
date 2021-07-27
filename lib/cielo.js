const fetch = require('node-fetch');

class cielo {

    static compra(params) {

        return fetch("https://apisandbox.cieloecommerce.cielo.com.br/1/sales/", {
            method: 'post',
            body: JSON.stringify(params),
            headers: { 
                'Content-Type': 'application/json',
                'MerchantId':'c9738caf-89b0-4f97-87dc-c500c7734136',
                'MerchantKey':'QPJQYQWGQYWZCFWHJWAWNGYYWGTUBOZULDSKWEVV'
        },
        })
            .then(res => res.json())
    }
    static captura(paymentId) {

        return fetch("https://apisandbox.cieloecommerce.cielo.com.br/1/sales/"+ paymentId +"/capture", {
            method: 'put',
            headers: { 
                'Content-Type': 'application/json',
                'MerchantId':'c9738caf-89b0-4f97-87dc-c500c7734136',
                'MerchantKey':'QPJQYQWGQYWZCFWHJWAWNGYYWGTUBOZULDSKWEVV'
        },
        })
            .then(res => res.json())
    }
    static consulta(paymentId) {

        return fetch("https://apiquerysandbox.cieloecommerce.cielo.com.br/1/sales/"+paymentId, {
            method: 'get',
            headers: { 
                'Content-Type': 'application/json',
                'MerchantId':'c9738caf-89b0-4f97-87dc-c500c7734136',
                'MerchantKey':'QPJQYQWGQYWZCFWHJWAWNGYYWGTUBOZULDSKWEVV'
        },
        })
            .then(res => res.json())
    }
}
module.exports = cielo;