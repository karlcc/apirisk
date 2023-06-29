const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");

async function syncAndInitialize() {
    try {
         // Check if the "assets" table exists
        const [results] = await db.sequelize.query(
            `SELECT EXISTS (
            SELECT 1 
            FROM information_schema.tables 
            WHERE table_schema = 'public' 
            AND table_name = 'assets'
            )`
        );
        const assetTableExists = results[0].exists;
    
        // If the "assets" table does not exist, create it and insert initial data
        if (!assetTableExists) {
                await db.assets.sync({ force: true });
                await db.insertInitialData();
            }
            console.log("Synced db.");
        await db.sequelize.sync();
    } catch (err) {
        console.log("Failed to sync db: " + err.message);
    }
}
//
syncAndInitialize();

// // drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to karlcc application." });
});

require("./app/routes/asset.routes")(app);
require("./app/routes/hist.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});