/*
  Config database properties
 */

// mlab configuration
// change to you local properties
const mlabUsername = "";
const mlabPassword = "";

// remote mlab database
const hostname = `${mlabUsername}:${mlabPassword}@ds139295.mlab.com`;
const port = `39295/shopping`;
const dbName = "shopping";

const MongodbConfig = {
  Url: `mongodb://${hostname}:${port}`,
  dbName: dbName
};

module.exports.MongodbConfig = MongodbConfig;
