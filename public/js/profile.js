window.addEventListener("load", ()=>{
    let boton = document.querySelector(".direccion-edit__button");
    let form = document.querySelector(".direccion-edit__form");
    let email = document.querySelector(".email__container");
    let direccion = document.querySelector(".direccion__container")
    let contador = 0;
    function cambio (){
            
        if (contador==0){
            form.style.display = "block"
            email.style.display = "none"
            direccion.style.display = "none"
            boton.innerHTML = "cerrar"
            contador = 1
        }else{
                form.style.display = "none"
                email.style.display = "block"
                direccion.style.display = "block"
                boton.innerHTML = "editar"
                contador = 0
            }
    }
    boton.addEventListener("click",cambio, true)
})