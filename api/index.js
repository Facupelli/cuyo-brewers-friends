import app from "./server.js";
import mongodb from "mongodb";
import dotenv from "dotenv";
import RestaurantsDAO from './dao/restaurantsDAO.js'
dotenv.config();
const MongoClient = mongodb.MongoClient; //access to mongoclient

const port = process.env.PORT || 8000; //create port number

MongoClient.connect(process.env.RESTREVIEWS_DB_URI, {
  maxPoolSize: 50,
  useNewUrlParser: true,
})
  .catch((err) => {
    console.error(err.stack);
    process.exit(1);
  })
  .then(async (client) => {
    await RestaurantsDAO.injectDB(client) // inicial reference to the collection
    app.listen(port, () => {
      console.log(`listening on port ${port}`);
    });
  });
