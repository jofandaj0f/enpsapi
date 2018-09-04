function logon(serviceAddress, userName, password, domainName, devKey) {
  var callPromise = $.ajax({
    url: serviceAddress + '/api/Logon',
    method: 'GET',
    dataType: 'json',
    contentType: 'application/json; charset=utf-8',
    data: {
      staffUserId: userName,
      domainUserId: userName,
      password: password,
      domainName: domainName,
      devKey: devKey
    },
    error: function(data, err) {
      console.log(err);
    }
  });
  console.log("Logged In");
  return callPromise.promise();
}

function Ping(serviceAddress, nomTokenId){
  var serviceAddress = "http://192.168.100.95/nomwebservices3api";
  var callPromise = $.ajax({
    url: serviceAddress + '/api/Ping',
    method: 'GET',
    dataType: 'json',
    contentType: 'application/json; charset=utf-8',
    data: {},
    beforeSend: function(xhr) { xhr.setRequestHeader('X-ENPS-TOKEN',nomTokenId);}
  });
  return callPromise.promise();
}

//SEARCH ENPS OPEN API
function Search(serviceAddress, nomTokenId, database, location) {
  var searchBody = {
  "Database": "WRNN-ENPS1",
  "MaxRows":200,
  "ExactMatch":false,
  "NOMContentTypes": {
    "All": false,
    "Audio": false,
    "Contacts": false,
    "Grids": false,
    "Messages": false,
    "NewsgatheringGrids": false,
    "NewsgatheringItems": false,
    "Pictures": false,
    "Readins": false,
    "Rundowns": true,
    "Scripts": false,
    "Storyboards": false,
    "Video": false
    },
  "NOMContentDates": {
    "All": true,
    "CustomDateRange": false,
    "FortyEightHours": false,
    "ItemDateFrom" : new Date().toJSON(),
    "ItemDateTo" : new Date().toJSON(),
    "Future": false,
    "OneHour": false,
    "OneWeek": false,
    "TwentyFourHours": false,
    "TwoHours": false
    },
  "NOMLocations" : [ { "BasePath" : location, "SearchArchives" : false, "SearchTrash" : false, "SearchWIP" : true } ]
  };
  var callPromise = $.ajax({
    url: serviceAddress + "/api/Search",
    method: "POST",
    dataType: "json",
    contentType: "application/json",
    data: JSON.stringify(searchBody),
    beforeSend: function(xhr) { xhr.setRequestHeader("X-ENPS-TOKEN",nomTokenId);}
  });
  return callPromise.promise();
};

function getMultiplePlanningContent(nomTokenId, recs) {
  console.log(recs);
  if(recs === undefined || recs === null || recs.length === 0) {
    alert('There are no activated rundowns on this Fios zone');
    location.reload();
  }
  var serviceAddress = 'http://192.168.100.95/nomwebservices3api';
  var callPromise = $.ajax({
    async: true,
    url: serviceAddress + '/api/RundownContent',
    type: 'POST',
    dataType: 'json',
    contentType: 'application/json; charset=utf-8',
    data: JSON.stringify(recs),
    beforeSend: function(xhr) {
      xhr.setRequestHeader('X-ENPS-TOKEN', nomTokenId);
    }
  });
  return callPromise.promise();
}
