var mongoose = require('mongoose');
var options = { server: { socketOptions: { connectTimeoutMS: 10000 }}};
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://PopoChou:1234@ds013206.mlab.com:13206/msmidereader',options);
var Schema = mongoose.Schema;
var recordSchema = new Schema({
  updateTime: String,
  profession: String

},{ collection: 'record' });

module.exports = mongoose.model('Record', recordSchema);
