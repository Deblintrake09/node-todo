const express = require('express');
const app = express();
const router = express.Router();
const bodyParser= require('body-parser');
const bcrypt = require("bcrypt");
const {sequelize} =require('../models/index');



app.set("view engine", "pug");
app.set("views", "views");

app.use(bodyParser.urlencoded({extended:false}));


router.get("/", (req, res, next)=>{

    
    res.status(200).render("login");
})

router.post("/", async (req, res, next)=>{

    let payload = req.body;
    
    if(req.body.logUsername && req.body.logPassword){
        let user = await sequelize.models.Usuario.findOne({
            $or: [
                {nombre:req.body.logUsername},
                {email:req.body.logUsername}
            ]
        })
        .catch((error)=>{
            console.log(error);
            payload.errorMessage = "Algo salió mal. Intente nuevamente.";
            res.status(200).render("login",payload);
        });
        if(user!=null){
            let result = await bcrypt.compare(req.body.logPassword, user.contraseña);
            if(result===true)
            {
                req.session.user={id:user.id, nombre:user.nombre, email:user.email, createdAt: user.createdAt};
                console.log(req.session.user);
                return res.redirect("/");
            }
        }
        payload.errorMessage = "email o contraseña incorrecta, intente nuevamente.";
        return res.status(200).render("login",payload);
    }
    payload.errorMessage = "Asegurese que ambos campos tengan valores válidos";
    res.status(200).render("login");
})

module.exports = router;