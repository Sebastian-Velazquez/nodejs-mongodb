const controlador ={
    register: (req, res)=>{
        res.render("./users/userRegister")
    },
    processRegister:(req,res)=>{
        res.send("Te Registraste")
    },
    login: (req, res)=>{
        res.render("./users/userLogin")
    },
    processLogin:(req,res)=>{
        res.send("Te logueaste")
    },
    profile:(req,res)=>{
        res.render("./users/userProfile")
    },
    logout:(req,res)=>{
        res.send('para salir de la session')
    }
}

module.exports = controlador;