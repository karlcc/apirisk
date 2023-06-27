## api for pyrisk

### api and database
Even api is not required for the scale of the application https://github.com/karlcc/pyrisk, it should help facilitate Distributed computing if more complex metric computing is added later.

ORM is purposed in the design of database. It should help doing simplification of database.

Project structure:
```

```

### database model
Assets table
```javascript
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
```

Hists table
```javascript
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
```

Eqs table
```javascript
const Eq_safef = sequelize.define("eq_safef", {
    curve: {
        type: DataTypes.TEXT
    }
});
```

One to Many Relationship
```javascript
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
```

## Deploy with docker