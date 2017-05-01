var mongoose = require('mongoose');

module.exports = mongoose.model('GovLogModel', {
    name : {type : String, default: ''},
    serverDt : {type : Date,default :''},
    temp1 : {type : Number, default:0},
    temp2 : {type : Number, default:0},
    tempC : {type : Number, default:0},
    humdC : {type : Number, default:0}
});
