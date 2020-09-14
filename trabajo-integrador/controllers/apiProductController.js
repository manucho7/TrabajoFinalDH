const db = require("../database/models");
module.exports = {
  products: async function (req, res, next) {
    try {
      const totalProductos = await db.sequelize.query(
        `SELECT COUNT(*) AS totalProductos FROM productos`
      );
      const cantidadProductos = totalProductos[0];
      const sumaBilleteras = await db.sequelize
        .query(`SELECT COUNT(productos.category) AS totalBilletera
        FROM productos
        WHERE category LIKE 'Billeteras'`);
      let totalBilleteras = sumaBilleteras[0];
      const sumaRemeras = await db.sequelize
        .query(`SELECT COUNT(productos.category) AS totalRemeras
        FROM productos
        WHERE category LIKE 'Remeras'`);
      let totalRemeras = sumaRemeras[0];
      const arrayProducts = await db.sequelize
        .query(`SELECT productos.title, productos.category, productos.image
            FROM productos`);
      let coleccionProductos = arrayProducts[0];
      //  Hacer for para iterar los productos de collectionProductos
      let producto;
      //let detail;
      for (let i = 0; i < coleccionProductos.length; i++) {
        // En cada vuelta del for, vamos a ir a buscar a la BD, las caracteristicas del producto que estoy iterando
        producto = coleccionProductos[i];
        let resultado = await db.sequelize.query(
          `SELECT * FROM caracteristicas WHERE producto_title LIKE '${producto.title}'`
        );
        //Una vez que obtengo las caracteristicas del producto que estoy iterando, se las agrego al producto.
        producto.caracteristicas = resultado[0];
        //if (producto.caracteristicas[0]) {
        //  producto.descripcion = producto.caracteristicas[0].descripcion;
       // }
        //forma URL y la agrega como clave dentro del OL
        producto.detail = "/api/products/" + producto.title;
      }
      res.json({
        cantidadProductos: cantidadProductos,
        cantidadPorCategoria: {
          billeteras: totalBilleteras,
          remeras: totalRemeras,
        },
        arrayListaProductos: coleccionProductos,
      });
    } catch (err) {
      console.log(err);
    }
  },
  product: async function (req, res, next) {
    const productoIngresado = req.params.id;
    try {
      // Vamos a buscar el producto que el usuario puso por parametro
      const productoResultado = await db.sequelize.query(
        `SELECT * FROM productos WHERE title = '${productoIngresado}'`
      );
      let result = productoResultado[0]; //devuelve un array
      let producto = result[0]; //guardo el OL de la 1er posicion de ese array
      // Vamos a buscar las caracteristicas de ese producto
      let resultado = await db.sequelize.query(
        `SELECT * FROM caracteristicas WHERE producto_title LIKE '${producto.title}'`
      );
      propiedades = resultado[0]; //devuelve un array
      // Las caracteristicas que buscamos, se la agregamos al producto
      if (propiedades) {
        producto.caracteristicas = propiedades;
        producto.descripcion = propiedades.descripcion;
      }
      // Armamos la URL y la agregamos al OL producto (ya tenemos la imagen en producto, pero armamos la URL)
      producto.urlImagen = producto.image;
      res.json(producto);
    } catch (err) {
      console.log(err);
    }
  },
};
