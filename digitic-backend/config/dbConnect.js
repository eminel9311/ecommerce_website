const { default: mongoose } = require("mongoose");

const dbConnect = () => {
  try {
    const DB_USER = process.env.DB_USER;
    const DB_PASSWORD = process.env.DB_PASSWORD;
    const DB_HOST = process.env.DB_HOST;
    const DB_PORT = process.env.DB_PORT;
    const DB_NAME = process.env.DB_NAME;
    const mongo_url = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/?authMechanism=SCRAM-SHA-1`;
    console.log('mongodb', mongo_url)
    const options = {
      autoIndex: true, // Don't build indexes
      maxPoolSize: 10, // Maintain up to 10 socket connections
      serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
      family: 4, // Use IPv4, skip trying IPv6
      dbName: DB_NAME,
    };
    mongoose.set('strictQuery', true);
    mongoose.connect(mongo_url, options)
        .then(() => console.log('connected to mongo'))
        .catch((err) => {
          console.error('failed to connect with mongo');
          console.error(err);
        });
  } catch (e) {
    
  }
};
module.exports = dbConnect;
