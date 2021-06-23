const express = require('express');
const bodyParser= require('body-parser');
const app = express();
const router = express.Router();
const bcrypt = require("bcrypt");
const {sequelize} =require('../models/index');

app.set("view engine", "pug");
app.set("views", "views");
app.use(bodyParser.urlencoded({extended:false}));


router.get("/", (req, res, next)=>{

    res.status(200).render("register");
})
router.post("/", async (req, res, next)=>{

    let nombre = req.body.nombre.trim();
    let email = req.body.email.trim();
    let password = req.body.password.trim();

    let payload = req.body;
    if(nombre && email && password){
        let user = await  sequelize.models.Usuario.findOne({where: { email: email}})
        .catch((error)=>{
            console.log(error);
            payload.errorMessage = "Algo salió mail - intente nuevamente";
            res.status(200).render("register", payload);
        });

        if(user==null){
            let data={
                nombre:nombre,
                email: email,
                contraseña: password,
            };
            data.contraseña = await bcrypt.hash(password,10);
            sequelize.models.Usuario.create(data)
            .then((user)=>{
                req.session.user=user;
                return res.redirect("/");
            });
        }else{
            //user found
            if(email==user.email)
            {
                payload.errorMessage = "Email ya se encuentra en uso";
            }
            res.status(200).render("register", payload);
        }

    }else{
        payload.errorMessage = "Asegurese que cada campo tiene sea válido.";
        res.status(200).render("register", payload);
    }
})

module.exports = router;