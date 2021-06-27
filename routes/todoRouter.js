var express = require('express');
var router = express.Router();
const {sequelize} = require('../models/index');

router.get('/', async function(req, res, next) {  //listar
  let tareas;
  let error=false;
  tareas = await sequelize.models.Item.findAll({include:[{model:sequelize.models.Lista}], where:{id_usuario:req.session.user.id}})
  .catch(err=>{
    console.log(err);
    error=true;
  })
  let payload={
    pageTitle: "Ver Tareas",
    tareas:tareas,
    userLoggedIn: req.session.user,
    userLoggedInJs: JSON.stringify(req.session.user),
  };
  
  if(tareas==undefined)
  {
    mensajeValue=error ? "Error - No se pudo recuperar tareas del sistema, intente nuevamente.":"No hay tareas guardadas. Cree una nueva Tarea.";
    Object.defineProperty(payload, 'mensaje', mensajeValue );
  }
  res.status(200).render('tareas', payload);
});

router.get('/agregar', async function(req, res, next) {  //form
  
  let listas = await sequelize.models.Lista.findAll({where:{id_usuario:req.session.user.id}});
  let payload={
    pageTitle: "Agregar Tarea",
    userLoggedIn: req.session.user,
    userLoggedInJs: JSON.stringify(req.session.user),
    listas:listas,
  };
  res.status(200).render('tarea-form', payload);
});

router.post('/agregar', function(req, res, next) {  //listar
  
  let tarea = {
    titulo: req.body.titulo,
    descripcion: req.body.descripcion,
    fecha_creacion: new Date(),
    fecha_limite: req.body.fecha_limite,
    prioridad: req.body.prioridad,
    estado: req.body.estado,
    id_lista:req.body.lista,
    id_usuario: req.session.user.id,
    fecha_resolucion:null,
  }
  if(req.body.lista==''){
    tarea.id_lista=null;
  }
  if(tarea.estado==="Terminado"){
    tarea.fecha_resolucion=new Date();
  }
  sequelize.models.Item.create(tarea)
  .then((result)=>{
    res.render("resultado", {agregado: result, tipo:"Tarea", userLoggedIn: req.session.user, redirect:`/tareas/${result.id}`})
  })
  .catch((err)=>res.render('error',{error:err}))
});

router.get('/:id', async function(req, res, next) {  //form ver para editar

  let tarea = await sequelize.models.Item.findOne({where:{id:req.params.id}})
  .catch((err)=>res.status(400).render('error',{error:err, userLoggedIn: req.session.user}));

  let listas= await sequelize.models.Lista.findAll()
  .catch((err)=>res.status(400).render('error',{error:err, userLoggedIn: req.session.user}));

  res.status(200).render('tarea-form',{tarea:tarea,
    listas:listas, 
    modificar:true, userLoggedIn: req.session.user});
});

router.put('/:id', async function(req, res, next) {  //actualizar
  let tarea = {
    titulo: req.body.titulo,
    descripcion: req.body.descripcion,
    fecha_limite: req.body.fecha_limite,
    fecha_resolucion: req.body.fecha_resolucion,
    prioridad: req.body.prioridad,
    estado: req.body.estado,
    id_lista:req.body.lista
  }
  if(req.body.lista===''){
    tarea.id_lista=null;
  }
  if(req.body.fecha_limite===''){
    tarea.fecha_limite=null;
  }
  if(req.body.fecha_resolucion===''){
    tarea.fecha_resolucion=null;
  }
  if(tarea.estado==="Terminado"){
    tarea.fecha_resolucion=new Date();
  }
  let resultado = await sequelize.models.Item.update(tarea, {where:{id:req.params.id}})
  .catch((err)=>res.render('error',{error:err, userLoggedIn: req.session.user}))
    res.render("resultado", {modificado: true, tipo:"Tarea", userLoggedIn: req.session.user, redirect:`/tareas/${resultado.id}`})
});

router.delete('/:id', function(req, res, next) {  //borra
  sequelize.models.Item.destroy({where:{id:req.params.id}})
  .then( result =>{
    res.render("resultado",{eliminado:true, tipo:"Tarea", userLoggedIn: req.session.user , redirect:`/tareas`});
  })
  .catch((err)=>res.render('error',{error:err, userLoggedIn: req.session.user}))
});


module.exports = router;
