// SDK de Mercado Pago
const mercadopago = require("mercadopago");


const controlador ={
    mercadopago:(req, res)=>{
        // Agrega credenciales
        mercadopago.configure({
            access_token: "APP_USR-7640889624539342-053118-1bd778dadef27d1292e2db2da73cd2fb-316001877",
        });


        // Crea un objeto de preferencia
        let preference = {
            back_urls:{ //aca p/ poner el link para volver a la pagina una vez realizado el pago
                success: 'https://compu-insumos.onrender.com/pay/success'
            },
            items: [
                {
                    title: "Mi producto",
                    unit_price: 0.01,
                    quantity: 1,
                },
            ],
            notification_url: 'https://compu-insumos.onrender.com/pay/notification'
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
    },
    success:(req, res)=>{
        res.send('El pago fue un exito!!')
    },
    notification_url:(req,res)=>{
        console.log('notificar')
        res.send()
    }
}

module.exports = controlador;