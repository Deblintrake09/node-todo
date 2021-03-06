var express = require('express');
const { Op } = require('sequelize');
var router = express.Router();
const {sequelize} = require('../models/index');

router.get('/', async function(req, res, next) {  //listar
  
  let listas;
  let error=false;
  listas = await sequelize.models.Lista.findAll()
  .catch(err=>{
    console.log(err);
    error=true;
  })
  
  let payload={
    pageTitle: "Ver Listas",
    userLoggedIn: req.session.user,
    userLoggedInJs: JSON.stringify(req.session.user),
  };
  if(listas==undefined)
  {
    payload.menjaje= error?"Error - No se pudo recuperar listas del sistema, intente nuevamente.":"No hay listas guardadas. Cree una nueva Lista.";
  }
  else{
    payload.listas = listas;
    payload.listasJs= JSON.stringify(listas);
  }
  res.status(200).render('listas', payload);
});

router.get('/agregar', async function(req, res, next) {  //form
  
  let payload={
    pageTitle: "Crear Lista",
    userLoggedIn: req.session.user,
    userLoggedInJs: JSON.stringify(req.session.user),
  };
  res.status(200).render('nueva-lista', payload);
});

router.post('/agregar', function(req, res, next) {  //guardar
  
  let lista = {
    id_usuario: req.session.user.id,
    titulo: req.body.titulo,
    fecha_creacion: new Date(),
    fecha_resolucion:null,
    estado: req.body.estado,
  }
  sequelize.models.Lista.create(lista)
  .then((result)=>{
    res.render("resultado", {tipo:"Lista", userLoggedIn: req.session.user, redirect:`/listas/${result.id}`})
  })
  .catch((err)=>res.render('error',{error:err, userLoggedIn: req.session.user}))
});

router.get('/:id', async function(req, res, next) {  //form ver para editar

  let lista = await sequelize.models.Lista.findOne({where:{id:req.params.id}})
  .catch((err)=>res.status(400).render('error',{error:err}));

  let tareasEnLista = await sequelize.models.Item.findAll({where:{id_lista:req.params.id}})
  .catch((err)=>res.status(400).render('error',{error:err}));

  let tareas= await sequelize.models.Item.findAll({where:{id_lista:null,estado:{[Op.not]: "Terminado"}}})
  .catch((err)=>res.status(400).render('error',{error:err}));

  if(tareasEnLista!= null){
    res.status(200).render('lista-form',{lista:lista,
      tareas:tareas,
      tareasEnLista:tareasEnLista, 
      modificar:true, userLoggedIn: req.session.user});  
  }else{
    res.status(200).render('lista-form',{lista:lista,
      tareas:tareas, 
      modificar:true, userLoggedIn: req.session.user});
  }
});

router.put('/modificar', async function(req, res, next) {  //actualizar
  
  let lista = {
    id_usuario: req.session.user.id,
    titulo: req.body.titulo,
    fecha_creacion: new Date(),
    fecha_resolucion:null,
    estado: req.body.estado,
  }
    
  if(req.body.fecha_resolucion===''){
    lista.fecha_resolucion=null;
  }
  if(lista.estado==="Terminado"){
    lista.fecha_resolucion=new Date();
  }
  let resultado = await sequelize.models.Lista.update(lista, {where:{id:req.params.id}})
  
  .catch((err)=>res.render('error',{error:err}))
  res.render("resultado", {modificado: true, tipo:"Lista", userLoggedIn: req.session.user, redirect:`/listas/${resultado.id}`})
});


router.delete('/:id', function(req, res, next) {  //borra
  sequelize.models.Lista.destroy({where:{id:req.params.id}})
  .then( result =>{
    res.render("resultado",{eliminado:true, tipo:"Lista", userLoggedIn: req.session.user, redirect:`/listas`});
  })
  .catch((err)=>res.render('error',{error:err, userLoggedIn: req.session.user}))
});

router.put('/agregartarea/:id', function(req, res, next) {  //AGREGA TAREA A LISTA
  sequelize.models.Item.update({id_lista:req.body.id_lista},{where:{id:req.params.id}})
  .then( result =>{
    res.render(`resultado`, { id:req.params.id, modificado:true, mensaje:"Se quit?? la Tarea a la Lista", tipo: "Tarea", userLoggedIn: req.session.user, redirect:`/listas/${req.body.id_lista}`});
  })
  .catch((err)=>res.render('error',{error:err, userLoggedIn: req.session.user}))
});


router.put('/quitartarea/:id', function(req, res, next) {  //QUITA TAREA DE LISTA
  sequelize.models.Item.update({id_lista:null},{where:{id:req.params.id}})
  .then( result =>{
    res.render(`resultado`, { id:req.params.id, modificado:true, mensaje:"Se agreg?? la Tarea a la Lista", tipo: "Tarea", userLoggedIn: req.session.user, redirect:`/listas/${req.body.id_lista}`});
  })
  .catch((err)=>res.render('error',{error:err, userLoggedIn: req.session.user}))
});


module.exports = router;
