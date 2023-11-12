require("dotenv").config();

const express = require("express");
const apiRoutes = require("./routes");

const app = express();

const port = process.env.PORT || 5000;

app.disable('x-powered-by');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res, next) => {
  return res.send({ message: "it works" });
})

app.use("/api", apiRoutes);

// 404
app.use(function (req, res, next) {
  const error = new Error(`${req.method.toUpperCase()} '${req.url}' not found.`);
  return res.status(404).send({ message: error.message, error });
});

// 500 - Any server error
app.use(function (error, req, res, next) {
  return res.status(error?.statusCode || 500).send({ message: error.message, error });
});

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
})