const db = require("../models");
const Asset = db.assets;
const Op = db.Sequelize.Op;

// Create and Save a new Asset
exports.create = (req, res) => {
    // Validate request
    if (!req.body.name) {
        res.status(400).send({
            message: "Name can not be empty!"
        });
        return;
    }
    if (!req.body.fromdate) {
        res.status(400).send({
            message: "Fromdate can not be empty!"
        });
        return;
    }
    if (!req.body.todate) {
        res.status(400).send({
            message: "Todate can not be empty!"
        });
        return;
    }

    // Create a Asset
    const asset = {
        name: req.body.name,
        fromdate: req.body.fromdate,
        todate: req.body.todate,
    };

    // Save Asset in the database
    Asset.create(asset)
        .then(data => {
        res.send(data);
        })
        .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while creating the Asset."
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

// Update a Asset by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Asset.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Asset was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update asset with id=${id}. Maybe Asset was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Asset with id=" + id
      });
    });
};

// Delete a Asset with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Asset.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Asset was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete asset with id=${id}. Maybe asset was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Asset with id=" + id
      });
    });
};

// Delete all assets from the database.
exports.deleteAll = (req, res) => {
    Asset.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} assets were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all assets."
      });
    });
};