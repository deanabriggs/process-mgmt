var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.sendFile(path.join(__dirname, "dist/process-mgmt/browser/index.html")); // added "browser" to path to match mapping
});

module.exports = router;
