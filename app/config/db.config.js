module.exports = {
    HOST: "postgresql",
    USER: "admin",
    PASSWORD: "admin",
    DB: "tutapi",
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };