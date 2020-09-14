module.exports = (sequelize, dataTypes) => {
    let alias = "Carritos";
    let cols = {
    idcarrito: {
        type: dataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    usuarios_email: {
        type: dataTypes.STRING,
    },
    };
    let config = {
        tableName: "carritos",
        timestamp: false,
    };
    const Carrito = sequelize.define(alias, cols, config);
    Carrito.associate=function(models){
        Carrito.belongsTo(models.Usuarios,{
            as:"usuario",
            foreignKey: "usuarios_email"
        })
    }
    Carrito.associate=function(models){
        Carrito.belongsToMany(models.Productos,{
            as:"productos",
            through: "carrito_producto",
            foreignKey: "carrito_id",
            otherKey: "producto_title",
            timestamp: false
        })
    }
    return Carrito;
};