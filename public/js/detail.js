window.addEventListener("load", ()=>{
    let botonIzq = document.querySelector(".boton-izq-PS");
    let botonDer = document.querySelector(".boton-der-PS");
    let carrusel = document.querySelector(".producto-relacionado__container")

    botonDer.addEventListener("click",()=>{
        carrusel.classList.add("producto-relacionado__containermov")
        botonDer.style.display = "none"
        botonIzq.style.display = "block"
        botonIzq.addEventListener("click",()=>{
            carrusel.classList.remove("producto-relacionado__containermov")
            botonIzq.style.display = "none"
            botonDer.style.display = "block"
        })
   })


})
