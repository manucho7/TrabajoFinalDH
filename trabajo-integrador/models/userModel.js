const fs = require('fs');
const path = require('path');
const db = require('../database/models')
function contrasenaValida(body) {
  const usuarios = readUsers();
  return usuarios.some(function (usuario) {
    return usuario.email === body.email && usuario.clave1 === body.clave1;
  });
}
function existeUsuario(email) {
  const usuarios = readUsers();
  return usuarios.some(function (usuario) {
    return usuario.email === email;
  });
}
function agregarUsuario(usuario) {
  //usuario.password= ACA INCRIPTACION
  saveUser(usuario);
}
function getUsuario(email) {
  const usuarios = readUsers();
  return usuarios.find(function (usuario) {
    return usuario.email === email;
  });
}
function readUsers() {
  return db.usuarios
  .findAll()
  .then(function(usuarios){
    console.log('LLEGARON LOS USUARIOS ' + usuarios);
  })
  //const data = fs.readFileSync(path.resolve(__dirname, "../data/users.json"), { encoding : 'utf8'});
  // const usuarios = JSON.parse(data);
  return [];
}
function saveUser(newUser) {
  const usuarios = readUsers();
  usuarios.push(newUser);
  fs.writeFileSync(path.resolve(__dirname, "../data/users.json"), JSON.stringify(usuarios));
}
module.exports = {
  contrasenaValida,
  existeUsuario,
  agregarUsuario,
  getUsuario,
};