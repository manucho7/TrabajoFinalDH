const fs = require('fs');
const path = require('path');

function agregarProducto(producto) {
  producto.image = `/images/${producto.image}`;
  saveProducts(producto)
}

function getProduct(title) {
  const products = readProducts();
  const producto = products.find(function (product) {
    return product.title === title;
  });
  return producto;
}

function getProductsByCategory(category) {
  const products = readProducts();
  return products.filter(function (producto) {
    return producto.category === category;
  });
}

function existeProducto(title) {
  const products = readProducts();
  return products.some(function (product) {
    return product.title === title;
  });
}

function editProduct(productModificado) {
  let products = readProducts();
  // traemos todos los productos menos el que tenemos que modificar
  const todosLosProductosMenos = products.filter(function(product) {
    return product.title !== productModificado.title;
  });
  // agregamos producto modificado
  todosLosProductosMenos.push(productModificado);
  products = todosLosProductosMenos;
  // Salva los cambios en el json de productos
  fs.writeFileSync(path.resolve(__dirname, '../data/products.json'), JSON.stringify(products));
}

function removeProduct(title) {
  let products = readProducts();
   // traemos todos los productos menos el que vamos a eliminar
    const todosLosProductosMenos = products.filter(function(product) {
    return product.title !== title;
  });
  
  products = todosLosProductosMenos;

  fs.writeFileSync(path.resolve(__dirname, '../data/products.json'), JSON.stringify(products));
}

function readProducts() {
  const data = fs.readFileSync(path.resolve(__dirname, '../data/products.json'), { encoding : 'utf8'});
  const products = JSON.parse(data);
  return products;
}

function saveProducts(newProduct) {
  const products = readProducts();
  products.push(newProduct);
  fs.writeFileSync(path.resolve(__dirname, '../data/products.json'), JSON.stringify(products));
}

module.exports = {
  agregarProducto,
  getProduct,
  getProductsByCategory,
  existeProducto,
  editProduct,
  removeProduct
};