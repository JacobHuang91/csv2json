// packages
const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const csv = require("csvtojson");
const _ = require("lodash");
// config
const { MongodbConfig } = require("./config");
const Url = MongodbConfig.Url;
const dbName = MongodbConfig.dbName;

const app = express();

app.listen(3009, () => {
  MongoClient.connect(
    Url,
    { useNewUrlParser: true },
    (err, client) => {
      // database
      const db = client.db(dbName);
      db.dropCollection("products", (err, res) => {
        // read data
        const filePath = "./data.csv";
        csv()
          .fromFile(filePath)
          .then(rawData => {
            // pick necessary columns
            const pickKeys = [
              "uniq_id",
              "product_url",
              "product_name",
              "product_category_tree",
              "retail_price",
              "discounted_price",
              "image",
              "description",
              "brand"
            ];

            const data = rawData.map(item => {
              return _.pick(item, pickKeys);
            });

            console.log("Wait a second!");
            db.collection("products")
              .insertMany(data)
              .then(res => {
                console.log("success");
              });
          });
      });
    }
  );
});
