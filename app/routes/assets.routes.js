module.exports = app => {
    const assets = require("../controllers/assets.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Asset
    router.post("/", assets.create);
  
    // Retrieve all assets
    router.get("/", assets.findAll);
  
    // Retrieve all published assets
    router.get("/published", assets.findAllPublished);
  
    // Retrieve a single Asset with id
    router.get("/:id", assets.findOne);
  
    // Update a Asset with id
    router.put("/:id", assets.update);
  
    // Delete a Asset with id
    router.delete("/:id", assets.delete);
  
    // Create a new Asset
    router.delete("/", assets.deleteAll);
  
    app.use('/api/assets', router);
  };