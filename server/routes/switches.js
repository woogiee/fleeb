var express = require('express');
var router = express.Router();
var Wemo = require('wemo-client');

var rightUrl = "http://192.168.1.171:49153/setup.xml";
var leftUrl = "http://192.168.1.165:49153/setup.xml";

router.get("/status/:switch", function(req, res) {
  var url = "";
  
    switch(req.params.switch) {
      case "right":
          url = rightUrl;
          break;
      case "left":
          url = leftUrl;
          break;
      default:
          url = "";
    }
  
    if (url) {
      var wemo = new Wemo();
      
      wemo.load(url, function(err, deviceInfo) {    
        // Get the client for the found device
        var client = wemo.client(deviceInfo);
      
        client.getBinaryState(function(err, state) {
          if (err) {
            res.status(500).json({ error: err.code });
          } else {
            res.json({ state: state == 1 ? true : false });
          }
        });
      });
    }
});

router.get('/trigger/:switch/:state', function(req, res) {
  
  var url = "";

  switch(req.params.switch) {
    case "right":
        url = rightUrl;
        break;
    case "left":
        url = leftUrl;
        break;
    default:
        url = "";
  }

  var state = req.params.state === "on" ? 1 : 0;

  if (url) {
    var wemo = new Wemo();
    
    wemo.load(url, function(err, deviceInfo) {    
      // Get the client for the found device
      var client = wemo.client(deviceInfo);
    
      // Turn the switch on
      client.setBinaryState(state);
    });
  }

  res.status(200).json({ message: state });
});

module.exports = router;
