module.exports = (sequelize, dataTypes) => {
    let alias = "Caracteristicas";
    let cols = {
        idcaracteristicas: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
    },
        productGender: {
            type: dataTypes.STRING,
    },
        height: {
            type: dataTypes.INTEGER,
    },
        divisiones: {
            type: dataTypes.INTEGER,
    },
        proteccionRFID: {
            type: dataTypes.STRING,
    },
        garantia: {
            type: dataTypes.STRING,
    },
        material: {
            type: dataTypes.STRING,
    },
        width: {
            type: dataTypes.INTEGER,
    },
        deep: {
            type: dataTypes.INTEGER,
    },
        money: {
            type: dataTypes.STRING,
    },
        producto_title: {
            type: dataTypes.STRING
    },
        descripcion: {
            type: dataTypes.STRING
    }
}
    let config = {
            tableName: "caracteristicas",
            timestamp: false,
        }
    const Caracteristicas = sequelize.define(alias, cols, config);
    Caracteristicas.associate=function(models){
        Caracteristicas.belongsTo(models.Productos,{
            as:"producto",
            foreignKey: "producto_title"
        })
    }
    return Caracteristicas;
    };