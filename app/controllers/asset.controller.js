const db = require("../models");
const Asset = db.assets;
const Op = db.Sequelize.Op;

// Create and Save a new Asset
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Asset
  const Asset = {
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false
  };

  // Save Asset in the database
  Asset.create(Asset)
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
  const title = req.query.title;
  var condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null;

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

// Find a single Asset with an id
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
          message: `Cannot update Asset with id=${id}. Maybe Asset was not found or req.body is empty!`
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
          message: `Cannot delete Asset with id=${id}. Maybe Asset was not found!`
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

// find all published Asset
exports.findAllPublished = (req, res) => {
  Asset.findAll({ where: { published: true } })
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