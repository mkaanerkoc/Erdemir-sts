var siteModels = require('../models/rawlogmodel.js');
var mongoose = require('mongoose');
var OuterData = [];
groupData = function(data,f){
  var groups = {};
  data.forEach( function( o )
  {
    var group = JSON.stringify( f(o) );
    groups[group] = groups[group] || [];
    groups[group].push( o );
  });
  return Object.keys(groups).map( function( group )
  {
    return groups[group];
  })
};

sortDataByData = function(data){
  data.sort(function(a,b) {return ((new Date(a.datetime) > new Date(b.datetime)) ? 1 : (new Date(b.datetime) > new Date(a.datetime)) ? -1 : 0);} );
};

module.exports = function(app) {

  app.get('/v1/site/:id/data/', function(req, res) {
      var outputData  = [];
      var count = 0;
      var startDate = new Date(req.query.from);
      var endDate = new Date(req.query.to);
      var channelID = req.params.id;
      var collectionNamesSite1=[siteModels.site1Model,siteModels.site2Model,siteModels.site3Model,siteModels.site4Model,siteModels.site5Model,siteModels.site6Model];
      var collectionNamesSite2=['posts.d8','posts.d9','posts.d10'];
      var collection=[];
      if(parseInt(req.params.id)===1){
        collection=collectionNamesSite1;
      }
      else if(parseInt(req.params.id)===2){

      }
      else{
        res.send("wrong site id");
      }

      collection.forEach(function(model,index){
        model.find({serverDt: { $gte: startDate, $lte: endDate }})
        .catch(function(err){
          console.log(err);
        })
        .then(function(datas){
          count=count+1;
          datas.forEach(function(data){
            data = data.toObject();
            var _date_ = new Date(data["serverDt"]);
            _date_.setSeconds(0);
            _date_.setMilliseconds(0);
            delete data['serverDt'];
            delete data['nodeDt'];
            delete data['mCrc'];
            delete data['rssi'];
            delete data['tempC'];
            delete data['humdC'];
            delete data['_id'];
            data["datetime"]=_date_.toISOString();
            data["status"]=1;
            data["channelId"]=parseInt(data["devID"]);
            delete data["devID"];
            outputData.push(data);
          });
          if(count===collection.length){
            result = groupData(outputData,function(item){
              return item.datetime;
            });
            var mdata=[];
            //console.log(result);
            result.forEach(function(sample,i){
              //console.log(sample);
              var data={};
              data["datetime"]=sample[0]["datetime"].substring(0, 19);;
              data["data"]=[];
              sample.forEach(function(s){
                delete s['datetime']
                data["data"].push(s);
              });
              mdata.push(data);
            });
            var returnObj={};
            returnObj["siteId"]=parseInt(req.params.id);
            returnObj["data"]=mdata;
            res.json(returnObj);
          }

      });
    });
  });
}
