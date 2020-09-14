const db = require("../database/models");
async function mostrarCategoriaProductos(req, res) {
  const data = await db.sequelize.query(
    `SELECT image FROM usuarios where email = '${req.cookies.usuarioLogeado}'`
  );
  const avatar = data[0][0];
  let avatarImage = "/images/avatar.png";
  if(avatar){
    avatarImage = avatar.image;
  }
  res.cookie('avatar', avatarImage);
  res.render("index", {
    title: "LIFESTYLE",
    email: req.cookies.usuarioLogeado,
    username: req.cookies.usuarioLogeado || "",
    isUserLogged: req.cookies.isUserLogged,
    avatar: avatarImage
  });
}
function mostrarListaProductos(req, res, next) {
  db.Productos.findAll()
    .then((productos) => {
      let datosProductos = [];
      for (let a = 0; a < productos.length; a++) {
        const producto = productos[a];
        if (producto.category === req.query.categoria) {
          datosProductos.push(producto);
        }
      }
      if (datosProductos.length) {
        //si tiene 1 o mas entra
        db.Usuarios.findAll()
          .then((usuarios) => {
            let datosUsuarios;
            for (let a = 0; a < usuarios.length; a++) {
              const usuario = usuarios[a];
              if (usuario.email === req.cookies.usuarioLogeado) {
                datosUsuarios = usuario;
              }
            }
            res.render("product_list", {
              categoryTitle: req.query.categoria,
              products: datosProductos,
              email: req.cookies.usuarioLogeado,
              rol: datosUsuarios ? datosUsuarios.rol : datosUsuarios,
              username: req.cookies.usuarioLogeado || "",
              isUserLogged: req.cookies.isUserLogged,
              avatar: req.cookies.avatar,
            });
          })
          .catch((error) => {
            console.log("error " + error.message);
          });
      }
    })
    .catch((error) => {
      console.log("error " + error.message);
    });
}
function mostrarDescripcionDelProducto(req, res) {
  db.Productos.findAll()
    .then((productos) => {
      db.Caracteristicas.findAll()
      .then(caracteristicas => {
        let producto = {};
        for (let a = 0; a < productos.length; a++) {
          const product = productos[a];
          if (product.title === req.params.title) {
            producto = product;
          }
        }
        let caracteristicasEncontradas = {};
        for(let i = 0;i < caracteristicas.length; i++){
          const caract = caracteristicas[i];
          if (caract.producto_title === producto.title){
            caracteristicasEncontradas = caract;
          }
        }
        if (producto) {
          res.render("product_desc", {
            email: req.cookies.usuarioLogeado,
            title: producto.title,
            image: producto.image,
            price: producto.price || "0",
            availableAmount: producto.availableAmount || "0",
            amount: producto.amount || "0",
            articleImage: producto.image,
            productGender: caracteristicasEncontradas.productGender,
            category: producto.category,
            // Billeteras
            divisiones: caracteristicasEncontradas.divisiones,
            proteccionRFID: caracteristicasEncontradas.proteccionRFID,
            garantia: caracteristicasEncontradas.garantia,
            height: caracteristicasEncontradas.height,
            width: caracteristicasEncontradas.width,
            deep: caracteristicasEncontradas.deep,
            money: caracteristicasEncontradas.money,
            // Remeras
            material: caracteristicasEncontradas.material,
            username: req.cookies.usuarioLogeado || "",
            isUserLogged: req.cookies.isUserLogged,
            avatar: req.cookies.avatar,
          });
        }
      })
    })
    .catch((error) => {
      console.log("error " + error.message);
    });
}
function mostrarNuevoProducto(req, res) {
  res.render("new_product", {
    username: req.cookies.usuarioLogeado || "",
    isUserLogged: req.cookies.isUserLogged,
    avatar: req.cookies.avatar,
  });
}
function agregarProducto(req, res) {
  req.body.image = `/images/${getImage(req)}`;
  db.sequelize.query(
    `INSERT INTO productos (\`title\`,\`category\`, \`price\`, \`image\`, \`amount\`) VALUES ("${req.body.title}", "${req.body.category}", "${req.body.price}", "${req.body.image}", "${req.body.amount}")`
  ).then(() => {
    db.sequelize.query(
      `INSERT INTO caracteristicas (\`productGender\`,\`height\`, \`divisiones\`, \`proteccionRFID\`, \`garantia\`, \`material\`, \`width\`, \`deep\`, \`money\`, \`producto_title\`, \`descripcion\`) VALUES ("${req.body.productGender}", "${req.body.height}", "${req.body.divisiones}", "${req.body.proteccionRFID}", "${req.body.garantia}", "${req.body.material}", "${req.body.width}", "${req.body.deep}", "${req.body.money}", "${req.body.title}", "${req.body.productDescription}")`
    ).then(() => {
      res.redirect("/products/" + req.body.title);
    }).catch((error) => {
      console.log('Error 1', error);
    })
  }).catch((err) => {
    console.log('Error 2', err);
  })
  
}
function getImage(req) {
  if (req.files && req.files.length > 0) {
    return req.files[0].originalname;
  } else {
    return "";
  }
}
function mostrarEdicionProducto(req, res) {
  db.Productos.findAll()
    .then((productos) => {
      let producto;
      for (let a = 0; a < productos.length; a++) {
        const product = productos[a];
        if (product.title === req.params.title) {
          producto = product;
        }
      }
      if (producto) {
        res.render("edit_product", {
          producto,
          username: req.cookies.usuarioLogeado || "",
          isUserLogged: req.cookies.isUserLogged,
          avatar: req.cookies.avatar,
        });
      }
    })
    .catch((error) => {
      console.log("error " + error.message);
    });
}
function confirmarEdicionProducto(req, res) {
  // Actualizo el producto existente con los cambios del producto modificado
  const newImage = getImage(req);
  if (newImage) {
    req.body.image = `/images/${newImage}`;
  }
  db.Productos.findAll()
    .then((productos) => {
      let producto;
      for (let a = 0; a < productos.length; a++) {
        const product = productos[a];
        if (product.title === req.params.title) {
          producto = product;
        }
      }
      if (producto) {
        req.body.image = req.body.image || producto.image;
        db.sequelize.query(
          `UPDATE productos SET \`title\`="${req.body.title}", \`category\`="${req.body.category}", \`price\`="${req.body.price}", \`image\`="${req.body.image}", \`amount\`="${req.body.amount}" WHERE \`title\` = "${req.body.title}";`
        );
        db.sequelize.query(
          `UPDATE caracteristicas SET \`productGender\`="${req.body.productGender}", \`height\`="${req.body.height}", \`divisiones\`="${req.body.divisiones}", \`proteccionRFID\`="${req.body.proteccionRFID}", \`garantia\`="${req.body.garantia}", \`material\`="${req.body.material}", \`width\`="${req.body.width}", \`deep\`="${req.body.deep}", \`money\`="${req.body.money}", \`producto_title\`="${req.body.title}", \`descripcion\`="${String(req.body.productDescription).trim()}" WHERE \`producto_title\` = "${req.body.title}";`
        );
      }
    })
    .catch((error) => {
      console.log("error " + error.message);
    });
  // una vez que realizo el cambio, muestro como quedo el producto
  res.redirect("/products/" + req.params.title);
}
function eliminarProducto(req, res) {
  // Le pedimos al modelo que elimine el producto\
  db.sequelize.query(
    `DELETE FROM caracteristicas WHERE \`producto_title\` = "${req.params.title}";`
  );
  db.sequelize.query(
    `DELETE FROM carrito_producto WHERE \`producto_title\` = "${req.params.title}";`
  );
  db.sequelize.query(
    `DELETE FROM productos WHERE \`title\` = "${req.params.title}";`
  );
  //productModel.removeProduct(req.params.title);
  // Redireccionamos al home
  res.redirect("/");
}
module.exports = {
  mostrarCategoriaProductos,
  mostrarListaProductos,
  mostrarDescripcionDelProducto,
  mostrarNuevoProducto,
  agregarProducto,
  mostrarEdicionProducto,
  confirmarEdicionProducto,
  eliminarProducto,
};
