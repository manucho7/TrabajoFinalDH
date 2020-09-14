module.exports = (sequelize, dataTypes) => {
  let alias = "Productos";
  let cols = {
    title: {
      type: dataTypes.STRING,
      primaryKey: true,
    },
    category: {
      type: dataTypes.STRING,
    },
    price: {
      type: dataTypes.DECIMAL,
    },
    image: {
      type: dataTypes.STRING,
    },
    amount: {
      type: dataTypes.INTEGER,
    },
  };
  let config = {
    tableName: "productos",
    timestamp: false,
  };
  const Producto = sequelize.define(alias, cols, config);
  Producto.associate = function (models) {
    Producto.belongsToMany(models.Carritos, {
      as: "carritos",
      through: "carrito_producto",
      foreignKey: "title",
      otherKey: "carrito_id",
      timestamp: false,
    });
  };
  Producto.associate = function (models) {
    Producto.belongsTo(models.Caracteristicas, {
      as: "caracteristicas",
      foreignKey: "title",
    });
  };
  return Producto;
};
