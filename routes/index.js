var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();

var connectionstring = "mongodb://arduffy:Austin90*@ds157584.mlab.com:57584/airplane";
mongoose.connect(connectionstring, { useMongoClient: true });

mongoose.Promise = global.Promise;

var clmbDataSchema = new mongoose.Schema({
    weight: Number,
    vfriflap5: Number,
    vfriflap10: Number,
    vfriflap15: Number,
    vclmb: Number
});

var takeoffDataSchema = new mongoose.Schema({
    flaps: Number,
    weight: Number,
    above20: Boolean,
    altitude: Number,
    vr: Number,
    v2: Number
});

var landingDataSchema = new mongoose.Schema({
    weight: Number,
    flaps: Number,
    vapp: Number,
    vref: Number,
    vga: Number
})


var ClmbData = mongoose.model('ClmbData', clmbDataSchema, 'ClmbData');
var TakeoffData = mongoose.model('TakeoffData', takeoffDataSchema, 'TakeoffData');
var LandingData = mongoose.model('LandingData', landingDataSchema, 'LandingData');

//clmb data
router.get('/clmbdata/:weight', function(req, res, next) {
 var weight = req.params.weight
 ClmbData.find({weight: weight}, function(err, clmbdatas){
     if(err){
         res.send(err);
         return console.error(err);
     }
    
     var output = ""
     var vfriflap5 = ""
     var vfriflap10 = ""
     var vfriflap15 = ""
     var vclmb = ""
     
     
     clmbdatas.forEach(function(clmbdata){
         console.log(clmbdata.vfriflap10);
         vfriflap5 = clmbdata.vfriflap5
         vfriflap10 = clmbdata.vfriflap10
         vfriflap15 = clmbdata.vfriflap15
         vclmb = clmbdata.vclmb
         
     });
     
     res.render('clmbdata',{title: 'ClmbData', answer: vfriflap10, answertwo: vclmb, answerthree: vfriflap5});
 });
});

//takeoffdata
router.get('/takeoffdata/:weight/:flaps/:above20', function(req, res, next) {
 var weight = req.params.weight
 var flaps = req.params.flaps
 var above20 = req.params.above20
 TakeoffData.find({weight: weight, flaps: flaps, above20: above20}, function(err, takeoffdatas){
     if(err){
         res.send(err);
         return console.error(err);
     }
     
     var output = ""
     var altitude = ""
     var vr = ""
     var v2 = ""

     takeoffdatas.forEach(function(TakeoffData){
         console.log(TakeoffData.vr);
         altitude = TakeoffData.altitude
         vr = TakeoffData.vr
         v2 = TakeoffData.v2
         
     });
     
     res.render('takeoffdata',{title: 'Takeoff Data', answer: altitude, answertwo: vr, answerthree: v2});
 });
});

//landing data
router.get('/landingdata/:weight/:flaps', function(req, res, next) {
 var weight = req.params.weight
 var flaps = req.params.flaps
 LandingData.find({weight: weight, flaps: flaps}, function(err, landingdatas){
     if(err){
         res.send(err);
         return console.error(err);
     }
    
     var output = ""
     var vapp = ""
     var vref = ""
     var vga = ""
     
     
     landingdatas.forEach(function(landingdata){
         console.log(landingdata.vapp);
         vapp = landingdata.vapp
         vref = landingdata.vref
         vga = landingdata.vga
     });
     
     res.render('landingdata',{title: 'Landing Data', answer: vapp, answertwo: vref, answerthree: vga});
 });
});

module.exports = router;