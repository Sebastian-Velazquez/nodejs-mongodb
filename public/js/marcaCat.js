window.addEventListener("load", ()=>{
    const form = document.querySelectorAll(".form-eliminar");
    
    form.forEach(f=>{
        
        f.addEventListener("submit",(e)=>{
            e.preventDefault();
            let res = window.confirm("estas seguro?");
            if(res===true){
                f.submit();
            }
    
        })
    })
   
})