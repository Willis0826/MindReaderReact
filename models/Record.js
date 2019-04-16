var mongoose = require('mongoose');
var options = { server: { socketOptions: { connectTimeoutMS: 10000 }}};
mongoose.Promise = global.Promise;
mongoose.connect(`mongodb://${process.env.MLAB_USER}:${process.env.MLAB_PASSWORD}@${process.env.MLAB_URL}`,options);
var Schema = mongoose.Schema;
var recordSchema = new Schema({
  eventName: String,
  professions: [{
    profession: String,
    count: Number
  }]
},{ collection: 'record' });

recordSchema.statics.findOneOrCreate = function findOneOrCreate(condition, doc, callback){
  const self = this;
  self.findOne(condition, (err, result) => {
    if(result){
      return callback(err, result);
    }
    
    return self.create(doc, (err, result) => {
      callback(err, result);
    });
  });
}

module.exports = mongoose.model('Record', recordSchema);
