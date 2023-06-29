const db = require("../models");
const Asset = db.assets;
const Hist = db.hists;
const Op = db.Sequelize.Op;

let apiKey;

try {
  const apiconfig = require('../config/api.config.js');
  apiKey = apiconfig.apiKey;
} catch (err) {
  apiKey = process.env.API_KEY;
}

// get historical data
exports.dlhistOne = (req, res) => {
    const assetId = req.params.id;

    const data = [
        [1, 10],
        [2, 12],
        [3, 14]
        ];

    const items = data.map(([trade_id, close_d]) => ({ trade_id, close_d, assetId }));

    Hist.bulkCreate(items)
        .then((createdItems) => {
        res.send({
          message: "Download successfully!"
        })
        })
        .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred."
        });
        });
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
