const db = require("../database/models");

module.exports = {
  users: async function (req, res, next) {
    try {
      const cant = await db.sequelize.query(`SELECT COUNT(*) FROM usuarios`);
      const cantidadUsuarios = cant[0][0];
      const data = await db.sequelize.query(
        `SELECT idusuario, nombre, email FROM usuarios`
      );
      const users = data[0];

      for (let i = 0; i < users.length; i++) {
        users[i].detail = "/api/users/" + users[i].idusuario;
      }

      res.json({
        count: cantidadUsuarios,
        users: users,
      });
    } catch (err) {
      console.log(err);
    }
  },

  user: async function (req, res, next) {
    const usuario = req.params.id;
    try {
      //Busco el la DB al usuario que se ingreso y pido algunas columnas
      const tabla = await db.sequelize.query(
        `SELECT idusuario, nombre, apellido, email, image FROM usuarios WHERE idusuario LIKE '${usuario}'`
      );
      //guardo la info
      const columnas = tabla[0];
      const infoUsuario = columnas[0];
    if(infoUsuario){
        //armo la url de la imagen
        const url = infoUsuario.image;

        res.json({
          columnas: infoUsuario,
          urlImagen: url,
        });
      }else res.json("Usuario no valido")
    } catch (err) {
      console.log(err);
    }
  },
};

/* SIN ASYNC AWAIT
// lamar al count
    db.sequelize.query(`SELECT COUNT(*) FROM usuarios`)
    .then((cant) => {
      const cantidadUsuarios = cant[0];
      // hacer otro sequalize que devuelva todos los usuarios
      db.sequelize
        .query(`SELECT idusuario, nombre, email FROM usuarios`)
        .then((data) => {
            let users = data[0];

          for (let i = 0; i < users.length; i++) {
            users[i].detail = "/api/users/" + users[i].idusuario;
          }
          // devolver
          res.json({
            count: cantidadUsuarios,
            users: users,
          });
        });
    });
    */
