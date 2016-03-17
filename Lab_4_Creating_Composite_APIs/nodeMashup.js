var request = require('request');
var http = require('http');
var urlparse = require('url');
var util = require('util');

function sendError(resp, code, msg) {
  var o = { 'error': msg };
  resp.writeHead(code, {'Content-Type': 'application/json'});
  resp.end(JSON.stringify(o));
}

function geocode(postalcode, country, radius, resp) {
  var url = util.format(
    'http://maps.googleapis.com/maps/api/geocode/json?address=%s&region=%s&sensor=false',
    postalcode, country);

  request(url, function(err, result, body) {
    if (err) {
      sendError(resp, 400,
                util.format('Error response %s from geocoding web service', err.message));
      return;
    }
    var geoResponse = JSON.parse(body);
    if (geoResponse.status !== 'OK') {
      sendError(resp, 500, 'Invalid geocode response');
    } else {
      getAltitude(geoResponse.results[0].geometry.location.lat,
                  geoResponse.results[0].geometry.location.lng, radius, resp);
    }
  });
}

function getAltitude(lat, lng, radius, resp) {
   var url = util.format(
     'http://api.usergrid.com/{your-org}/sandbox/hotels?q=location within %s of %s, %s',
     radius, lat, lng);

   request(url, function(err, result, body) {
     if (err) {
        sendError(resp, 400,
        util.format('Error response %s from elevation web service', err.message));
        return;
     }

     var hotelResponse = JSON.parse(body);
       if (hotelResponse.count == '0') {
         sendError(resp, 200, 'Sorry! We could not find any hotels with those values');
       } else {
         makeResponse(lat, lng, hotelResponse.entities, resp);
       }
    });
}

function makeResponse(lat, lng, hotels, resp) {
  var o = { 'latitude': lat, 'longitide': lng,
            'hotels': hotels };
  resp.writeHead(200, {'Content-Type': 'application/json'});
  resp.end(JSON.stringify(o));
}

var svr = http.createServer(function(req, resp) {
  var parsed = urlparse.parse(req.url, true);
  if (!parsed.query.zipcode) {
    sendError(resp, 400, 'Missing query parameter "zipcode"');
  } else if (!parsed.query.country) {
    sendError(resp, 400, 'Missing query parameter "country"');
  }else if (!parsed.query.radius) {
    sendError(resp, 400, 'Missing query parameter "radius"');
  }  else {
    geocode(parsed.query.zipcode, parsed.query.country, parsed.query.radius, resp);
  }
});

svr.listen(9000, function() {
  console.log('Node Mashup sample app is running on port 9000');
});
