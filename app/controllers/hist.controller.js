const db = require("../models");
const Asset = db.assets;
const Hist = db.hists;
const Op = db.Sequelize.Op;

let apiKey;

try {
  const apiconfig = require("../config/api.config.js");
  apiKey = apiconfig.apiKey;
} catch (err) {
  apiKey = process.env.API_KEY;
}

const alpha = require("alphavantage")({ key: apiKey });

function getDailyAdjusted(symbol) {
    return new Promise((resolve, reject) => {
        alpha.data.daily_adjusted(symbol, "compact")
            .then((daily_adjusted) => {
            const timeSeries = daily_adjusted["Time Series (Daily)"];
            const closeDataArray = Object.entries(timeSeries).map(([date, dailyData], index) => {
                const trade_id = Object.keys(timeSeries).length - index;
                const close_d = dailyData["4. close"];
                return [trade_id, date, close_d];
            });
            // Reverse the order of the array
            closeDataArray.reverse();
            resolve(closeDataArray);
            })
            .catch((error) => {
                reject(error);
            });
    });
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

    getDailyAdjusted("ibm")
    .then((closeDataArray) => {
        // console.log(closeDataArray);
        // Perform computations or operations using closeDataArray
    })
    .catch((error) => {
      console.error(error);
    });

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

// Retrieve all hists by asset from the database.
exports.findAll = (req, res) => {
  const assetId = req.query.assetId;
  var condition = {assetId: assetId};

  Hist.findAll({ where: condition,
    include: {
      model: Asset,
      as: "asset",
      attributes: ["name"],
    },
  })
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

// Find a single hist with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Hist.findByPk(id, {
    include: {
      model: Asset,
      as: "asset",
      attributes: ["name"],
    },
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Asset with id=" + id
      });
    });
};
