const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const router = require("./router/routes");
const connectDatabase = require("./helpers/connectDatabase");

require("dotenv").config();

connectDatabase();

const app = express();
const port = process.env.PORT;

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "https://ipss-test-frontend.vercel.app");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS,CONNECT,TRACE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Content-Type-Options, Accept, X-Requested-With, Origin, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Private-Network", true);
  res.setHeader("Access-Control-Max-Age", 7200);

  next();
});

app.use(bodyParser.json({ limit: "15mb" }));
app.use(bodyParser.urlencoded({ limit: "15mb", extended: true }));
app.use(cors());
app.use(express.json());

app.use("/api", router);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
