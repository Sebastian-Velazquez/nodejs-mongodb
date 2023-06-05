// SDK de Mercado Pago
const mercadopago = require("mercadopago");


const controlador ={
    createOrden: async(req, res)=>{
        console.log(req.body)
        // Agrega credenciales
        mercadopago.configure({
            access_token: "TEST-4388668567724591-060212-c44af7b3de68e54d180b4d6b506b153b-1385641118",
        });
        const result = await mercadopago.preferences.create({
            items: [
                {
                    title: req.body.title,
                    unit_price: parseInt(req.body.number), 
                    currency_id: "ARS" ,
                    quantity: 1,
                },
            ],
            back_urls:{ //aca p/ poner el link para volver a la pagina una vez realizado el pago
                success: 'https://compu-insumos.onrender.com/pay/success', //si se realizo e pago
                failure: 'https://compu-insumos.onrender.com/pay/failure' , //si fallo el pago
                pending: 'https://compu-insumos.onrender.com/pay/pending' , //el pago esta en pendiente
            },
            notification_url: 'https://compu-insumos.onrender.com/pay/notification'
        })
        console.log(result)
        res.redirect(result.body.init_point)
        //res.redirect(result.body)
    },
    success:(req, res)=>{
        res.send('El pago fue un exito!!')
    },
    failure: (req,res)=>{
        res.send('Pago realizado!')
    },
    pending:(req,res)=>{
        res.send('El pago esta pendiente!')
    },
    notification_url:async(req,res)=>{
        console.log(req.query);
        try {
            if(req.query.typr == 'payment'){
                const data = await mercadopago.payment.findById(peyment['data.id'])
                console.log(data);
                //aca guardar los datos en DB de data
            }
            res.sendStatus(204)
        } catch (error) {
            console.log(error);
            return res.sendStatus(500).json({error: error.message});
        }
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