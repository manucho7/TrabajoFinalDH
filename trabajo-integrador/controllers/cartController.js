const cartModel = require("../models/cartModel");
const db = require("../database/models");
function truncarDecimal(num, fixed) {
  var re = new RegExp("^-?\\d+(?:.\\d{0," + (fixed || -1) + "})?");
  return num.toString().match(re)[0];
}
function mostrarCart(req, res) {
  //const cart = cartModel.getCart(req.cookies.usuarioLogeado);
  db.Carritos.findAll().then((carritos) => {
    let carritoUsuario;
    for (let i = 0; i < carritos.length; i++) {
      const carrito = carritos[i];
      if (carrito.usuarios_email === req.cookies.usuarioLogeado) {
        carritoUsuario = carrito;
      }
    }
    let total = 0;
    let subtotal = 0;
    if (carritoUsuario) {
      db.sequelize
        .query(
          `
      SELECT 
      (p.price * cp.cantidad) as total, 
      p.title, 
      p.image, 
      p.price, 
      cp.cantidad as amount,
      cp.idcarrito_producto as idCarritoProducto
      FROM productos p 
  INNER JOIN carrito_producto cp ON cp.producto_title = p.title
  INNER JOIN carritos c ON c.idcarrito = cp.carrito_id
  WHERE  c.idcarrito = ${carritoUsuario.idcarrito}
      `
        )
        .then((totales) => {
          const productosDelCarrito = totales[0];
          for (let i = 0; i < productosDelCarrito.length; i++) {
            total = total + Number(productosDelCarrito[i].total);
            subtotal = subtotal + Number(productosDelCarrito[i].total);
          }
          res.render("cart", {
            products: productosDelCarrito,
            descuento: 0,
            envio: 0,
            total: truncarDecimal(total, 2),
            subtotal: truncarDecimal(subtotal, 2),
            email: req.cookies.email,
            username: req.cookies.usuarioLogeado || "",
            isUserLogged: req.cookies.isUserLogged,
            avatar: req.cookies.avatar,
          });
        });
    } else {
      res.render("cart", {
        products: [],
        descuento: 0,
        envio: 0,
        total: 0,
        subtotal: 0,
        email: req.cookies.email,
        username: req.cookies.usuarioLogeado || "",
        isUserLogged: req.cookies.isUserLogged,
        avatar: req.cookies.avatar,
      });
    }
  });
}
function agregarCart(req, res) {
  db.Carritos.findAll().then((carritos) => {
    // obtener carrito del usuario
    let carritoUsuario;
    for (let i = 0; i < carritos.length; i++) {
      const carrito = carritos[i];
      if (carrito.usuarios_email === req.cookies.usuarioLogeado) {
        carritoUsuario = carrito;
      }
    }
    if (!carritoUsuario) {
      // hacer script de crear carrito para el ususario // hacer un INSERT INTO bla bla
      db.sequelize
        .query(
          `INSERT INTO carritos (\`usuarios_email\`) VALUES("${req.cookies.usuarioLogeado}")`
        )
        .then(() => {
          db.sequelize
            .query(
              `SELECT idcarrito FROM carritos WHERE usuarios_email="${req.cookies.usuarioLogeado}"`
            )
            .then((id) => {
              const resultadoDeQuery = id[0];
              const idCarrito = resultadoDeQuery[0].idcarrito;
              db.sequelize
                .query(
                  `INSERT INTO carrito_producto(\`carrito_id\`,\`producto_title\`, \`cantidad\`) VALUES(${idCarrito},"${req.body.title}",${req.body.amountNumber})`
                )
                .then(() => {
                  res.redirect("/cart");
                });
            });
        });
    } else {
      db.sequelize
        .query(
          `INSERT INTO carrito_producto(\`carrito_id\`,\`producto_title\`, \`cantidad\`) VALUES(${carritoUsuario.idcarrito},"${req.body.title}",${req.body.amountNumber})`
        )
        .then(() => {
          res.redirect("/cart");
        });
    }
  });
}
function cleanCart(req, res) {
  db.sequelize.query(`SELECT * FROM carritos
    where usuarios_email="${req.cookies.usuarioLogeado}"`)
    .then((resultado)=>{
      const resu=resultado[0];
      const carrito = resu[0];
      db.sequelize.query(`DELETE FROM carrito_producto WHERE carrito_id = ${carrito.idcarrito}`)
      .then(()=>{
        res.redirect("/cart");
      })
    })
}
function editCart(req, res) {
  // hacer script para que actualice el amount de la tabla cp,
  db.sequelize.query(
    `UPDATE carrito_producto SET \`cantidad\`="${req.body.newAmount}" WHERE idcarrito_producto= "${req.body.idCarritoProducto}"`
  )
  .then(()=>{
    res.redirect("/cart");
  })
  .catch((error) => {
    console.log("error " + error.message);
  });
}
module.exports = {
  mostrarCart,
  agregarCart,
  cleanCart,
  editCart,
};