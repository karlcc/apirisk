module.exports = (sequelize, DataTypes) => {
    const Eq_safef = sequelize.define("eq_safef", {
        curve: {
            type: DataTypes.TEXT
        }
    });

    return Eq_safef;
};