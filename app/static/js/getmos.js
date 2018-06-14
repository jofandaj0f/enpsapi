function getmos(net){
  //Logon ENPS API
  var logon = {
    "async": true,
    "crossDomain": true,
    "url": "http://192.168.100.95/NOMWebServices3API/api/Logon?staffUserId=enpsapi&domainuserId=enpsapi&password=3nps%40P10&domainName=rnntv&devKey=6ef80146-1200-4312-a55a-80032f785e55%00&iClientType=7",
    "method": "GET"
  };
  
  // Maintain Session
  var maintain = {
    "async": true,
    "crossDomain": true,
    "url": "http://192.168.100.95/nomwebservices3api/api/Ping",
    "method": "GET",
    "headers": {
      "x-enps-token": "15410C17-FAAA-49F3-929097CE8970C4CA"
    }
  };
  // Logout
  var logout = {
    "async": true,
    "crossDomain": true,
    "url": "http://192.168.100.95/NOMWebServices3API/api/Logout",
    "method": "GET",
    "headers": {
      "x-enps-token": "15410C17-FAAA-49F3-929097CE8970C4CA"
    }
  };

}
