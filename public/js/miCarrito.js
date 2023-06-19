window.addEventListener('load',()=>{
    let carritoBody = document.querySelector('.carrito-body')
    if(localStorage.carrito){
        let carrito = JSON.parse(localStorage.carrito);
        carrito.forEach(element => {
            fetch(`http://localhost:3030/product/apidetail/${element.id}`)
            .then((res) => res.json())
            .then((prod)=>{
                carritoBody.innerHTML += `<tr>
                <th></th>
                <th>${prod.name}</th>
                <th>${element.cantidad}</th>
                <th>${prod.price}</th>
                <th>${parseFloat(prod.price * element.cantidad, 2).toFixed(2) }</th>
           </tr>`
            })
            
        });
    }
})