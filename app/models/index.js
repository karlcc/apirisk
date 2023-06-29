const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.assets = require("./asset.model.js")(sequelize, Sequelize);
db.hists = require("./hist.model.js")(sequelize, Sequelize);
db.eqs = require("./eq_safef.model.js")(sequelize, Sequelize);

db.assets.hasMany(db.hists,{ as: "hists"});
db.assets.hasMany(db.eqs,{ as: "eq_safef"});
db.hists.belongsTo(db.assets, {
    foreignKey: "assetId",
    as: "asset",
});
db.eqs.belongsTo(db.assets, {
    foreignKey: "assetId",
    as: "asset",
});

db.sync = async () => {
    await db.sequelize.sync();
};
  
db.insertInitialData = async () => {
    // Insert preset data here
    const assets = [
        { name: 'spy', fromdate: '2019-01-01', todate: '2021-01-01' },
        { name: 'nvda', fromdate: '2019-01-01', todate: '2021-01-01' },
        { name: 'gld', fromdate: '2019-01-01', todate: '2021-01-01' },
        { name: 'lqd', fromdate: '2019-01-01', todate: '2021-01-01' },
        { name: 'tip', fromdate: '2019-01-01', todate: '2021-01-01' },
        { name: 'shy', fromdate: '2019-01-01', todate: '2021-01-01' },
    ];

    await db.assets.bulkCreate(assets);
}

module.exports = db;