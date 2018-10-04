function findMOS(zone) {
  $('#listData').each(function() {
    $('.panel-body').remove();
  });
  // LOAD 0
  $('#header').append('<h4 id="blah">Loading...</h4>');
  $('#loading-spinner').remove();
  $('#loader').append('<div id="loading-spinner"><div class="spin-icon"></div></div>');
  $.ajax({
    url: '/info',
    type: 'GET',
    datatype: 'json',
    contentType: 'application/json'
  }).done(function(data) {
    //LOAD 1
    $('#blah').remove();
    $('#header').append('<h4 id="blah">Logging In...</h4>');
    $('#loading-spinner').remove();
    $('#loader').append('<div id="loading-spinner"><div class="spin-icon"></div></div>');
    logon(data["url"], data["name"], data["password"], data["enps"], data["key"]).done(function(data) {
      var loginID = data["SessionID"];
      // LOAD 2
      $('#blah').remove();
      $('#header').append('<h4 id="blah">Searching...</h4>');
      $('#loading-spinner').remove();
      $('#loader').append('<div id="loading-spinner"><div class="spin-icon"></div></div>');
      Search("http://192.168.100.95/NOMWebServices3API", loginID, "WRNN-ENPS1", zone).done(function(data) {
        var rundowns = [];
        console.log('Total Rundowns: ', data['SearchResults'].length);
        for (var i = 0; i < data['SearchResults'].length; i++) {
          var z = data['SearchResults'][i];
          if (z.ObjectProperties[10].FieldValue) {
            var runObj = {
              database: z.ListData.ENPSDatabase,
              path: z.ListData.Path,
              guid: z.ListData.Guid,
              returnText: false
            }
            rundowns.push(runObj);
          }
        }
        // LOAD 3
        $('#blah').remove();
        $('#header').append('<h4 id="blah">Finding MOS IDs...</h4>');
        $('#loading-spinner').remove();
        $('#loader').append('<div id="loading-spinner"><div class="spin-icon"></div></div>');
        getMultiplePlanningContent(loginID, rundowns).done(function(data) {
          //FOR LOOP GOES THROUGH EACH RUNDOWN
          // $('#page-loader').remove();
          for (var i = 0; i < data.length; i++) {
            var name = data[i].ListData.Title;
            // FOR LOOP GOES THROUGH EACH COLLECTION SCRIPTS
            $('#listData').append('<div class="panel-body"><h3>' + name + '</h3></div>');
            for (var k = 0; k < data[i].CollectionScripts.length; k++) {
              var breakdown = data[i].CollectionScripts[k].RecordPointer.ObjectProperties; //Pulls up the ObjectProperties Array
              // FOR LOOP GOES THROUGH ALL OBJECT PROPERTIES.
              var newness = {};
              for (var j = 0; j < breakdown.length; j++){// Creates Key and Values without FieldName and FieldValue of MOSAbstracts and Title.
                var stored1 = breakdown[j].FieldName;
                var stored2 = breakdown[j].FieldValue;
                newness[stored1] = stored2;
              }
              if(newness["MOSAbstracts"] !== undefined && newness["MOSAbstracts"].length < 12){
                $('#listData').append('<div class="panel-body"><h4>' + newness.MOSAbstracts + '</h4>:' + newness.Title + '</div>');
              }
            }
          }
          $('#blah').remove();
          $('#loading-spinner').remove();
        });
      });
    });
  });
}
