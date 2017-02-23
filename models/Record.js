var mongoose = require('mongoose');
mongoose.connect('mongodb://PopoChou:1234@ds013206.mlab.com:13206/msmidereader');
var Schema = mongoose.Schema;
var recordSchema = new Schema({
  updateTime: String,
  profession: String

},{ collection: 'record' });

module.exports = mongoose.model('Record', recordSchema);
