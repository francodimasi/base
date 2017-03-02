var express = require('express');
var router = express.Router();
var Cloudant = require('cloudant');
var cloudantUrl = "https://0507a4c9-784f-41e0-bc7c-8de4d68be77f-bluemix:1c484579e88edee90350072d8f0fb57f23bf27a0228a6839367ac3bbbf415ad2@0507a4c9-784f-41e0-bc7c-8de4d68be77f-bluemix.cloudant.com/";
var cloudant = Cloudant({url: cloudantUrl, plugin:'promises'});
// var nano = require('nano')('https://0507a4c9-784f-41e0-bc7c-8de4d68be77f-bluemix:1c484579e88edee90350072d8f0fb57f23bf27a0228a6839367ac3bbbf415ad2@0507a4c9-784f-41e0-bc7c-8de4d68be77f-bluemix.cloudant.com/');


/* GET home page. */
router.get('/', function(req, res, next) {

});

router.get('/tweets', function(req, res, next) {

    var tweets = cloudant.db.use('tweets');
    //
    // sandbox.list({ "include_docs": true }).then(function(data) {
    //   var obj = '{"docs": []}';
    //   var docs = JSON.parse(obj);
    //   data.rows.forEach(function(doc) {
    //     doc.doc.created_at = Date.parse(doc.doc.created_at);
    //     docs['docs'].push(doc.doc);
    //   });
    //   sandbox.bulk(docs).then(function(data){
    //     console.log(data);
    //   }).catch(function(err){
    //     console.log('something went wrong', err);
    //   });
    // }).catch(function(err) {
    //   console.log('something went wrong', err);
    // });

    var now = new Date();

    tweets.find({"selector": { "created_at": { "$gte": now.setHours(now.getHours() - 12) }}, "sort": [ {"created_at" : "desc"} ]}).then(function(data) {
        data.docs.forEach(function(doc){
          doc.created_at = new Date(doc.created_at);
        });
        res.send(data);
    }).catch(function(err) {
      console.log('something went wrong', err);
    });

});

router.get('/history', function(req, res, next) {

    var tweets = cloudant.db.use('tweets');

    var now = new Date();

    tweets.find({"selector": { "created_at": { "$gte": now.setHours(now.getHours() - 72) }}, "sort": [ {"created_at" : "desc"} ]}).then(function(data) {
        data.docs.forEach(function(doc){
          doc.created_at = new Date(doc.created_at);
        });
        res.send(data);
    }).catch(function(err) {
      console.log('something went wrong', err);
    });

});

module.exports = router;
