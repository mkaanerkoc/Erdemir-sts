// app/routes.js

// grab the nerd model we just created
var siteModels = require('../models/rawlogmodel.js');
module.exports = function(app) {

   // server routes ===========================================================
   // handle things like api calls
   // authentication routes

   // sample api route
   app.get('/api/:id/', function(req, res) {
       var outputData  = [];
       var startDate = new Date(req.query.from);
       var endDate = new Date(req.query.to);
       var channelID = req.params.id;
       console.log(startDate);
       console.log(endDate);

       //buralar değiştirilecek//
       siteModels.site1Model.find({serverDt: { $gte: startDate, $lte: endDate }},function(err, datas) {
           if (err)
             res.send(err);
           datas.forEach(function(data){
             data = data.toObject();
             delete data['nodeDt'];
             delete data['_id'];
             outputData.push(data);
           });
           res.json(outputData); // return all nerds in JSON format
       });
   });

   // route to handle creating goes here (app.post)
   // route to handle delete goes here (app.delete)

   // frontend routes =========================================================
   // route to handle all angular requests
   app.get('/', function(req, res) {
      res.sendfile('./public/views/index.html'); // load our public/index.html file

   });

};
