module.exports = (sequelize, DataTypes) => {
    const Asset = sequelize.define("asset", {
        name: {
            type: DataTypes.STRING
        },
        fromdate: {
            type: DataTypes.STRING
        },
        todate: {
            type: DataTypes.STRING
        },
        car25: {
            type: DataTypes.REAL,
            defaultValue: 0.0
        },
        safef: {
            type: DataTypes.REAL,
            defaultValue: 0.0
        },
        cor2bench: {
            type: DataTypes.REAL,
            defaultValue: 0.0
        }
    });

  return Asset;
};