const router = require("express").Router();

router.use("/alarm", require("./alarm/router"));

module.exports = router;
