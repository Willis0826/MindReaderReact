const path = require('path');
const express = require('express');
const record = require('../controllers/record');//紀錄
const getRecords = require('../controllers/getRecords');//全部
const events = require('../controllers/event');//場次
const result = require('../controllers/result');//對錯 結果
const getResult = require('../controllers/getResult');
const router = express.Router();

router.route('/').get(function(req, res){
  res.sendFile(path.join(__dirname, '../index.html'));
});
router.route('/record').post(record).get(getRecords);
router.route('/event').get(events);
router.route('/result').post(result).get(getResult);
module.exports = router;
