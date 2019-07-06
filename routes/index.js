var express = require("express");
var router = express.Router();
// 爬虫
const bilbil = require("../public/javascripts/bilbil");
const acfun = require("../public/javascripts/acfun");
setInterval(() => {
  acfun.start();
  bilbil.start();
}, 2000);
/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Express" });
});
module.exports = router;
