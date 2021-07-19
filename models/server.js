const express = require('express');
const cors = require('cors');
const { json } = require('express');
const { dbConnection } = require('../db/config.database');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    //Db connections
    this.connectToDb();
    //Middlewares
    this.middlewares();
    //Routes
    this.routes();
  }

  async connectToDb() {
    await dbConnection();
  }

  middlewares() {
    //Enable CORS to APPLICATION
    this.app.use(cors());
    //Enables the application to read and write JSON format to request and responses
    this.app.use(express.json());
    //Middlesware to share the public folder
    this.app.use(express.static('public'));
  }

  routes() {
    //In order to call the routes, it is necessary to create a new middleware calling routes file
    this.app.use('/api/user', require('../routes/user.routes'));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Application running on port ${this.port}`);
    });
  }
}

module.exports = Server;
