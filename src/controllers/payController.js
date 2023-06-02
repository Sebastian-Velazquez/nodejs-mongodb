// SDK de Mercado Pago
const mercadopago = require("mercadopago");


const controlador ={
    createOrden: async(req, res)=>{
        // Agrega credenciales
        mercadopago.configure({
            access_token: "TEST-4388668567724591-060212-c44af7b3de68e54d180b4d6b506b153b-1385641118",
        });
        const result = await mercadopago.preferences.create({
            items: [
                {
                    title: "Mi producto",
                    unit_price: 100, 
                    currency_id: "ARS" ,
                    quantity: 1,
                },
            ],
            back_urls:{ //aca p/ poner el link para volver a la pagina una vez realizado el pago
                success: 'https://compu-insumos.onrender.com/pay/success', //si se realizo e pago
                failure: 'https://compu-insumos.onrender.com/pay/failure' , //si fallo el pago
            },
            notification_url: 'https://compu-insumos.onrender.com/pay/notification'
        })
        console.log(result)
        res.send("Orden Creada")
    },
    success:(req, res)=>{
        res.send('El pago fue un exito!!')
    },
    failure: (req,res)=>{
        res.send('Pago rexhazado!')
    },
    notification_url:(req,res)=>{
        console.log('notificar')
        res.send()
    }
}

module.exports = controlador;


        // Crea un objeto de preferencia
        /* let preference = {
               back_urls:{ //aca p/ poner el link para volver a la pagina una vez realizado el pago
                success: 'https://compu-insumos.onrender.com/pay/success'
            }, 
        }; */

        /* mercadopago.preferences
            .create(preference)
            .then(function (response) {
                console.log(response.body.init_point)
                res.send(`<a href="${response.body.init_point}"> IR A PAGAR </a>`)
            // En esta instancia deberás asignar el valor dentro de response.body.id por el ID de preferencia solicitado en el siguiente paso
            })
            .catch(function (error) {
            console.log(error);
            });  
           // res.send(response) */

           /* notification_url: 'https://compu-insumos.onrender.com/pay/notification' */