var express = require('express');
var router = express.Router();
var wall = require('../mutual/wall');
/* GET home page. */
router.all('*',function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

  if (req.method == 'OPTIONS') {
    res.send(200); /*让options请求快速返回*/
  }
  else {
    next();
  }
});
router.get('/', function(req, res, next) {
  console.log(111)
  wall.getAllComments(req, res, next)
});

module.exports = router;
