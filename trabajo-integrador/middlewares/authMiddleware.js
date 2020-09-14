const userModel = require("../models/userModel");
const db = require("../database/models");
const bcrypt = require("bcrypt");

function isAuthenticatedUser(req, res, next) {
  db.Usuarios.findAll().then((usuarios) => {
    let datosUsuarios;
    for (let a = 0; a < usuarios.length; a++) {
      const usuario = usuarios[a];
      if (
        usuario.email === req.cookies.usuarioLogeado &&
        bcrypt.compareSync(req.cookies.password, usuario.clave1)
      ) {
        datosUsuarios = usuario;
      }
    }
    if (datosUsuarios && req.cookies.isUserLogged === "true") {
      next();
    } else {
      res.redirect("/users/login");
    }
  });
}

function isNotAuthenticatedUser(req, res, next) {
  db.Usuarios.findAll().then((usuarios) => {
    let datosUsuarios;

    if (req.cookies.isUserLogged === "false") {
      next();
      return;
    }

    for (let a = 0; a < usuarios.length; a++) {
      const usuario = usuarios[a];
      if (
        usuario.email === req.cookies.usuarioLogeado &&
        bcrypt.compareSync(req.cookies.password, usuario.clave1)
      ) {
        datosUsuarios = usuario;
      }
    }
    if (datosUsuarios) {
      res.redirect("/");
    } else {
      next();
    }
  });
}

module.exports = {
  isAuthenticatedUser,
  isNotAuthenticatedUser,
};
