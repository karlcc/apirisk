## api for pyrisk

### api and database
Even api is not required for the scale of the application https://github.com/karlcc/pyrisk, it should help Distributed computing if more complex metric computing is added later.

ORM is purposed in the design of database. It should help simplification of database.

Project structure:
```

```

### database model
```javascript
module.exports = (sequelize, Sequelize) => {
    const asset = sequelize.define("asset", {
      issue: {
        type: Sequelize.STRING
      },
      fromdate: {
        type: Sequelize.STRING
      },
      todate: {
        type: Sequelize.STRING
      },
      car25: {
        type: Sequelize.REAL
      },
      safef: {
        type: Sequelize.REAL
      },
      cor2bench: {
        type: Sequelize.REAL
      }
    });
  
    return Asset;
  };
```


## Deploy with docker