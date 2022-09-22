const express = require("express");
const app = express();

app.use(express.json());

app.use("/", require("./router"));

app.use((err, req, res, next) => {
  console.log(err);
  res.sendStatus(500);
});

app.listen(7000, () => {
  console.log("Listening on port 7000 ...");
});
