module.exports = (sequelize, dataTypes) => {
    let alias = "Usuarios";
    let cols = {
    idusuario: {
        type: dataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
        type: dataTypes.STRING,
    },
    apellido: {
        type: dataTypes.STRING,
    },
    clave1: {
        type: dataTypes.STRING,
    },
    rol: {
        type: dataTypes.STRING,
    },
    email: {
        type: dataTypes.STRING,
    },
    };
    let config = {
        tableName: "usuarios",
        timestamp: false,
    };
    const Usuario = sequelize.define(alias, cols, config);
    Usuario.associate=function(models){
        Usuario.belongsTo(models.Carritos,{
            as:"carrito",
            foreignKey: "email"
        })
    }
    return Usuario;
};