const path = require('path');
const express = require('express');
const record = require('../controllers/record');
const getRecords = require('../controllers/getRecords');
const events = require('../controllers/event');
const router = express.Router();

router.route('/').get(function(req, res){
  res.sendFile(path.join(__dirname, '../index.html'));
});
router.route('/record').post(record).get(getRecords);
router.route('/event').get(events);
module.exports = router;
