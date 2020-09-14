const productModel = require("./productModel");
const carts = [
  {
    email: "elmaiten3@gmail.com",
    descuento: 0,
    envio: "100",
    products: [
      {
        title: "Remera 1",
        amount: "11",
        price: "511",
        image: "/images/clubMen1.png",
        subtotal: "5,621",
      },
    ],
  },
];
/**
 * Agrega 1 tipo de producto al carro de compra.
 *
 * @param {*} email Quien esta comprando el producto
 * @param {*} title El identificador del producto que estoy comprando
 * @param {*} amount La cantidad de productos de un producto determinado que estoy comprandando
 */
function agregarProductoAlCart(email, title, amount) {
  // Voy a buscar mi chango, que contiene todos los productos de mi compra
  //const miCarroDeCompra = getCart(email);
  // Creo un objeto literal que contiene la informacion del producto que compre
  const productoCompleto = productModel.getProduct(title);
  const productoComprado = {
    title: title,
    amount: amount,
    price: productoCompleto.price,
    image: productoCompleto.image,
    subtotal: Math.trunc(Number(productoCompleto.price) * amount),
  };
  // A mi carro de compra le agrego el producto que compre
  miCarroDeCompra.products.push(productoComprado);
  // salvar miCarroDeCOmpra en un json. cars.json
}
function getCart(email) {
  let cartDelUsuario = carts.find(function (cart) {
    return cart.email === email;
  });
  if (!cartDelUsuario) {
    cartDelUsuario = { email: email, products: [], envio: 100, descuento: 0 };
    carts.push(cartDelUsuario); // se agrega el cart a la base de datos
  }
  return cartDelUsuario; // {email:"", products: []}
}
function getProductsFromCart(email) {
  const cartDelUsuario = getCart(email);
  return cartDelUsuario.products;
}
function incrementarProductoExistente(email, title, amount) {
  const cartDelUsuario = getCart(email);
  // {email: "vivi@gmail.com", products: [{name: 'remera', price: "$ 123", amount: 3}] }
  const productoDelCart = cartDelUsuario.products.find(function (producto) {
    return producto.title === title;
  });
  productoDelCart.amount = Number(productoDelCart.amount) + Number(amount);
  // salvar los cambios en caso de que implementamos persistencia en archivos o BD.
}
function getTotal(email) {
  const cartDelUsuario = getCart(email);
  let total = 0;
  for (let i = 0; i < cartDelUsuario.products.length; i++) {
    total =
      total +
      Number(cartDelUsuario.products[i].price) *
        Number(cartDelUsuario.products[i].amount);
  }
  total = total + Number(cartDelUsuario.envio);
  return total;
}
function getSubtotal(email) {
  const cartDelUsuario = getCart(email);
  let total = 0;
  for (let i = 0; i < cartDelUsuario.products.length; i++) {
    total =
      total +
      Math.trunc(Number(cartDelUsuario.products[i].price) *
        Number(cartDelUsuario.products[i].amount));
  }
  return total;
}
function cleanCart(email) {
  const cartDelUsuario = getCart(email);
  cartDelUsuario.products = [];
}
function editItemAmount(email, newAmount, title) {
  const cartDelUsuario = getCart(email);
  const productoAModificar = cartDelUsuario.products.find(function (producto) {
    return producto.title === title;
  });
  productoAModificar.amount = newAmount;
  productoAModificar.subtotal = Math.trunc(
    Number(productoAModificar.price) * Number(newAmount)
  );
}
module.exports = {
  agregarProductoAlCart,
  getCart,
  getProductsFromCart,
  getTotal,
  getSubtotal,
  cleanCart,
  editItemAmount,
};