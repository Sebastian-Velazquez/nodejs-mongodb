// SDK de Mercado Pago
const mercadopago = require("mercadopago");


const controlador ={
    mercadopago:(req, res)=>{
        // Agrega credenciales
        mercadopago.configure({
            access_token: "TEST-2678067983968473-052910-dceb9cb0b0a91e6aa97d969d6ed561b8-316001877",
        });


        // Crea un objeto de preferencia
        let preference = {
            back_urls:{ //aca p/ poner el link para volver a la pagina una vez realizado el pago
                success: 'http://localhost:3030/'
            },
            items: [
                {
                    title: "Mi producto",
                    unit_price: 100,
                    quantity: 1,
                },
            ],
            notification_url: 'urlnotificacion'
        };
        
        mercadopago.preferences
            .create(preference)
            .then(function (response) {
                console.log(response.body.init_point)
                res.send(`<a href="${response.body.init_point}"> IR A PAGAR </a>`)
            // En esta instancia deberás asignar el valor dentro de response.body.id por el ID de preferencia solicitado en el siguiente paso
            })
            .catch(function (error) {
            console.log(error);
            });  
           // res.send(response)
    }
}

module.exports = controlador;