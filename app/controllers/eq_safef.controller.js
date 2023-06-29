const db = require("../models");
const Asset = db.assets;
const Op = db.Sequelize.Op;

// compute
exports.cal = (req, res) => {
 
};

// Retrieve all assets from the database.
exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { [Op.iLike]: `%${name}%` } } : null;

  Asset.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving assets."
      });
    });
};

// Find a single asset with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Asset.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Asset with id=" + id
      });
    });
};
