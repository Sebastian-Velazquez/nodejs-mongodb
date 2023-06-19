window.addEventListener('load',()=>{
    let botonCarrito = document.querySelector('.add-cart');
    let cantidad = document.querySelector('.cantidad');
    let notCar = document.querySelector('.notificacion-carrito')
    notCar.innerText = localStorage.carrito ? JSON.parse(localStorage.carrito).length: "";
    botonCarrito.addEventListener('click',(e)=>{
        /* console.log(e.target.dataset.id) */
        if (localStorage.carrito){
            let carrito = JSON.parse(localStorage.carrito)
            let index = carrito.findIndex(prod=>prod.id == e.target.dataset.id)
           
            if (index!=-1){
                carrito[index].cantidad = carrito[index].cantidad + parseInt(cantidad.value)
            }else{
                carrito.push({id:e.target.dataset.id, cantidad:parseInt(cantidad.value)})
            }
            localStorage.setItem('carrito',JSON.stringify(carrito))
        }else{
            localStorage.setItem('carrito',JSON.stringify([{id:e.target.dataset.id, cantidad:parseInt(cantidad.value)}]))
        }// minuto 47
        botonCarrito.innerHTML = "PRODUCTO AGREGADO"
        botonCarrito.style.backgroundColor = "var(--bs-success)"
        botonCarrito.style.border = "solid 0.75px  #fff"
        notCar.innerText = JSON.parse(localStorage.carrito).length
    })
})