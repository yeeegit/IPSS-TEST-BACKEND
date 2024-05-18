const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const router = require("./router/routes");
const connectDatabase = require("./helpers/connectDatabase");

require("dotenv").config();

connectDatabase();

const app = express();
const port = process.env.PORT;

app.use(bodyParser.json({ limit: "15mb" }));
app.use(bodyParser.urlencoded({ limit: "15mb", extended: true }));
app.use(cors());
app.use(express.json());

app.use("/api", router);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
