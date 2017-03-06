var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;
//right: 正確的數量
//wrong: 錯誤的數量
var resultSchema = new Schema({
  professions: [{
    profession: String,
    right: Number,
    wrong: Number
  }]
},{ collection: 'result' });

resultSchema.statics.findOneOrCreate = function findOneOrCreate(condition, doc, callback){
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

module.exports = mongoose.model('Result', resultSchema);
