module.exports = (sequelize, DataTypes) => {
    const Hist = sequelize.define("hist", {
        trade_id: {
            type: DataTypes.INTEGER
        },
        close_d: {
            type: DataTypes.REAL
        },
        retrun_d: {
            type: DataTypes.REAL
        },
        pnl: {
            type: DataTypes.REAL
        }
    });

    return Hist;
};