var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  let payload = {
      pageTitle: "BrainDump",
      userLoggedIn: req.session.user,
      userLoggedInJs: JSON.stringify(req.session.user), // Convierte el usuario a string para poder pasarlo en llamadas de JS
  }
  console.log(payload);
  res.status(200).render("index", payload);
});

module.exports = router;
