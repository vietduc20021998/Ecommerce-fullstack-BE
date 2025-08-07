const express = require("express");
const dotenv = require("dotenv");
const { default: mongoose } = require("mongoose");
const routes = require("./routes");
dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

routes(app);

mongoose
  .connect(process.env.MONGO_DB)
  .then(() => {
    console.log("Connected");
  })
  .catch((err) => console.log(err));

app.listen(port, () => {
  console.log("Server is running in port: " + port);
});
