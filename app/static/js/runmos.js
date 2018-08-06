function findMOS(zone) {
  $('#listData').each(function() {
    $('.panel-body').remove();
  });
  $('#loader').append('<div class="signal"></div>');
  $.ajax({
    url: '/info',
    type: 'GET',
    datatype: 'json',
    contentType: 'application/json'
  }).done(function(data) {
    logon(data["url"], data["name"], data["password"], data["enps"], data["key"]).done(function(data) {
      var loginID = data["SessionID"];
      Search(data["url"], loginID, "WRNN-ENPS1", zone).done(function(data) {
        // console.log(data['SearchResults'].length, ' ', data['SearchResults']);
        var rundowns = [];
        console.log('Search Results: ', data['SearchResults']);
        console.log('Length of Search Results: ', data['SearchResults'].length);
        for (var i = 0; i < data['SearchResults'].length; i++) {
          // console.log(z);
          var z = data['SearchResults'][i];
          console.log('FieldValue: ', z.ObjectProperties[10].FieldValue);
          console.log('GUID: ', z.ListData.Guid);
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
        getMultiplePlanningContent(loginID, rundowns).done(function(data) {
          console.log('36: ', data);
          var fieldVal = data["0"].CollectionScripts["0"].RecordPointer.ObjectProperties[34].FieldValue;
          // console.log('38: ', fieldVal);
          for (var i = 0; i < data.length; i++) {
            var name = data[i].ListData.Title;
            // console.log('41: ', name);
            // console.log('42: ', i);
            $('#listData').append('<div class="panel-body"><h3>' + name + '</h3></div>');
            for (var k = 0; k < data[i].CollectionScripts.length; k++) {
              var drop = data[i].CollectionScripts[k].RecordPointer.ObjectProperties.length;
              // console.log('46: ',i);
              // console.log('47: ',k);
              if (drop > 33) {
                var val = data[i].CollectionScripts[k].RecordPointer.ObjectProperties[34];
                if (val.FieldValue.constructor !== Array) {
                  if (val.FieldName === "MOSAbstracts") {
                    var title;
                    var mossy = data[i].CollectionScripts[k].RecordPointer.ObjectProperties[34].FieldValue;
                    if (data[i].CollectionScripts[k].RecordPointer.ObjectProperties[42].FieldName === "Title") {
                      title = data[i].CollectionScripts[k].RecordPointer.ObjectProperties[42].FieldValue;
                    } else if (data[i].CollectionScripts[k].RecordPointer.ObjectProperties[43].FieldName === "Title") {
                      title = data[i].CollectionScripts[k].RecordPointer.ObjectProperties[43].FieldValue;
                    }
                    $('#listData').append('<div class="panel-body"><h4>' + mossy + '</h4> : ' + title + '</div>');
                  }
                } else if (val.constructor === Array) {
                  console.log(val[0]);
                }
              }
            }
          }
          $('.signal').remove();
        });
      });
    });
  });
}
