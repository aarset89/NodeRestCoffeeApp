const mongoose = require('mongoose');

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_CONNECTIONSTRING, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    console.log(`Database connected`);
  } catch (error) {
    throw new error(`${error}`);
  }
};

module.exports = {
  dbConnection,
};
