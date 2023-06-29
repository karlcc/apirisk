module.exports = app => {
    const hists = require("../controllers/hist.controller.js");
  
    var router = require("express").Router();

    // download historical data with id
    router.post("/:id", hists.dlhistOne); 
  
    // Retrieve all hists
    router.get("/", hists.findAll);

    app.use('/api/hists', router);
  };