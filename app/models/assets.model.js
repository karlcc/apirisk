module.exports = (sequelize, Sequelize) => {
    const Asset = sequelize.define("Asset", {
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