const handler = require("./handler");
const router = require("express").Router();

router.post("/", handler.save);

router.post("/comment", handler.comment);

router.post("/terminate", handler.terminate);

module.exports = router;
