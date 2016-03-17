var hotelsResponse = context.getVariable("response.content"),
    zipcode = context.getVariable("zipcode"),
    radius = context.getVariable("radius"),
    finalResponse = {};

// initialize hotels response
finalResponse.hotels = {};
// add queryparams used as part of the hotels response
finalResponse.hotels.queryparams = JSON.parse('{ ' + '"zipcode" : "' + zipcode + '", "radius" : "' + radius + '" }');
// add the hotels response
if (hotelsResponse != null) {
  var hotelsJSON = JSON.parse(hotelsResponse);
  finalResponse.hotels.resultsMetadata = {};
  // set results count
  finalResponse.hotels.resultsMetadata.count = 0;
  if (hotelsJSON.count != null && hotelsJSON.count != "") {
      finalResponse.hotels.resultsMetadata.count = hotelsJSON.count;
  }
  // set current results cursor
  if (hotelsJSON.params != null && hotelsJSON.params.cursor != null && hotelsJSON.params.cursor != "") {
  	finalResponse.hotels.resultsMetadata.currentCursor = hotelsJSON.params.cursor[0];
  }
  // set next results cursor
  if (hotelsJSON.cursor != null && hotelsJSON.cursor != "") {
  	finalResponse.hotels.resultsMetadata.nextCursor = hotelsJSON.cursor;
  }
  // set the list of hotels
  finalResponse.hotels.entities = hotelsJSON.entities;
}

// update the response that will be returned to the client
context.setVariable("response.content", JSON.stringify(finalResponse));
