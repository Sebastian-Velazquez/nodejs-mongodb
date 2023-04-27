const controlador ={
    index: (req, res)=>{ 
        res.render("index")
    },
    create: (req, res)=>{ 
        res.send("Index")
    },
    edit: (req, res)=>{ 
        res.send("Update")
    },
    delete: (req, res)=>{ 
        res.send("Delete")
    }
}

module.exports = controlador;