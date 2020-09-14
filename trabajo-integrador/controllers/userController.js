const { validationResult } = require("express-validator");
const db = require("../database/models");
const bcrypt = require("bcrypt");

module.exports = {
  mostrarLogin: function (req, res) {
    if (req.cookies.recodarContrasena) {
      res.render("login", {
        errors: [],
        username: req.cookies.usuarioLogeado || "",
        password: req.cookies.password,
        isChecked: req.cookies.recodarContrasena === "true",
        avatar: req.cookies.avatar,
        isUserLogged: false,
      });
    } else {
      res.render("login", {
        errors: [],
        username: "",
        password: "",
        isChecked: "",
        avatar: req.cookies.avatar,
        isUserLogged: false,
      });
    }
  },

  login: function (req, res) {
    const errors = validationResult(req);
    const tieneError = !errors.isEmpty();
    if (tieneError) {
      return res.render("login", {
        errors: errors.array(),
        username: req.cookies.usuarioLogeado,
        password: req.cookies.password,
        isChecked: req.cookies.recodarContrasena === "true",
        avatar: req.cookies.avatar,
      });
    } else {
      db.Usuarios.findAll()
        .then((usuarios) => {
          let datosUsuarios;
          for (let a = 0; a < usuarios.length; a++) {
            const usuario = usuarios[a];
  
            if (usuario.email === req.body.email && bcrypt.compareSync(req.body.clave1, usuario.clave1)) {//valida que coincida usuario y contraseña
              datosUsuarios = usuario;
            }
          }

          if (datosUsuarios) {
            res.cookie("isUserLogged", true);
            res.cookie("usuarioLogeado", req.body.email);
            res.cookie("password", req.body.clave1);
            res.cookie("avatar", datosUsuarios.image || "/images/avatar.png");
            if (req.body.guardar === "on") {
              res.cookie("recodarContrasena", true);
            } else {
              res.cookie("recodarContrasena", false);
            }
            res.redirect("/");

          } else {
            res.send("Usuario o contrasena invalida");//si no encuentra el email
          }
        })
        .catch((error) => {
          console.log("error" + error.message);
        });
    }
  },

  mostrarSignUp: function (req, res) {
    res.render("sign_up", {
      username: "",
      isUserLogged: req.cookies.isUserLogged,
      avatar: req.cookies.avatar,
    });
  },

  agregarUsuario: function (req, res) {
    db.Usuarios.findAll()
      .then((usuarios) => {
        let datosUsuarios;
        for (let a = 0; a < usuarios.length; a++) {
          const usuario = usuarios[a];
          if (usuario.email === req.body.email) {
            datosUsuarios = usuario;
          }
        }
        if (datosUsuarios) {
          res.send(
            "El email ya se encuentra en uso, por favor ingrese otro email"
          );
        } else {
          req.body.image = getImage(req);
          req.body.image = `/images/${req.body.image}`;
          req.body.id = getRandomInt();
          
          const passwordEncriptada = bcrypt.hashSync(req.body.clave1, 10);

          db.sequelize.query(
            `INSERT INTO usuarios (\`idusuario\`,\`nombre\`, \`apellido\`, \`clave1\`, \`rol\`, \`image\`,\`email\`)VALUES (${req.body.id}, "${req.body.nombrePersona}", "${req.body.apellido}", "${passwordEncriptada}", "${req.body.rol}", "${req.body.image}","${req.body.email}")`
          );
         
          res.cookie("isUserLogged", true);
          res.cookie("usuarioLogeado", req.body.email);
          res.cookie("password", req.body.clave1);
          res.cookie("avatar", req.body.image);
          res.redirect("/");
        }
      })
      .catch((error) => {
        console.log("error " + error.message);
      });
  },

  logout: function (req, res) {
    res.cookie("isUserLogged", false);
    if (req.cookies.recodarContrasena !== "true") {
      res.cookie("usuarioLogeado", "");
      res.cookie("password", "");
      res.cookie("avatar", "");
    }
    res.redirect("/users/login");
  },

  mostrarEditarPerfil: (req, res) => {
    db.Usuarios.findAll().then((usuarios) => {
      let usuarioEncontrado;
      for (let i = 0; i < usuarios.length; i++) {
        if (req.cookies.usuarioLogeado == usuarios[i].email) {
          usuarioEncontrado = usuarios[i];
        }
      }
      if (usuarioEncontrado) {
        res.render("edit_user", {
          isUserLogged: req.cookies.isUserLogged,
          avatar: req.cookies.avatar,
          usuario: req.cookies.usuarioLogeado,
          contrasena: req.cookies.password,
          username: usuarioEncontrado.nombre,
          apellido: usuarioEncontrado.apellido,
        });
      }
    });
  },

  editarPerfil: (req, res) => {
    req.body.image = getImage(req);
    const image = `/images/${req.body.image}` || req.cookies.avatar;
    const email = req.body.email || req.cookies.usuarioLogeado;
    const passwordEncriptada = bcrypt.hashSync(req.body.clave1, 10);
    db.sequelize
      .query(
        `UPDATE usuarios
    SET
    \`nombre\` = "${req.body.nombre}",
    \`apellido\` = "${req.body.apellido}",
    \`clave1\` = "${passwordEncriptada}",
    \`image\` = "${image}"
    WHERE \`email\` = "${req.cookies.usuarioLogeado}";`
      )
      .then(() => {
        res.cookie("usuarioLogeado", email);
        res.cookie("avatar", image);
        res.cookie("password", req.body.clave1);
        res.redirect("/");
      });
  },
};

function getRandomInt() {
  let min = 1;
  let max = 99999;
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getImage(req) {
  if (req.files && req.files.length > 0) {
    return req.files[0].originalname;
  } else {
    return "";
  }
}
