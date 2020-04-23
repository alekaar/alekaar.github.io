(function (global) {

// Set up a namespace for our utility
var ajaxUtils = {};


// Returns an HTTP request object
function getRequestObject() {
  if (window.XMLHttpRequest) {
    return (new XMLHttpRequest());
  } 
  else if (window.ActiveXObject) {
    // For very old IE browsers (optional)
    return (new ActiveXObject("Microsoft.XMLHTTP"));
  } 
  else {
    global.alert("Ajax is not supported!");
    return(null); 
  }
}


// Makes an Ajax GET request to 'requestUrl'
ajaxUtils.sendGetRequest = 
  function(requestUrl, responseHandler, isJsonResponse) {
    
    var request = getRequestObject();
    console.log(request);
    
    request.onreadystatechange = 
      function() {
        
        handleResponse(request, 
                       responseHandler,
                       isJsonResponse); 
      };
    request.open("GET", requestUrl, true);
    request.send(null); // for POST only
  };


// Only calls user provided 'responseHandler'
// function if response is ready
// and not an error
function handleResponse(request,
                        responseHandler,
                        isJsonResponse) {
                          console.log('BOOOOO', request);

  if ((request.readyState == 4) &&
     (request.status == 200)) {
    console.log(1);
    
    // Default to isJsonResponse = true
    if (isJsonResponse == undefined) {
      isJsonResponse = true;
      console.log(2);
      
    }
    
    if (isJsonResponse) {
      console.log(3);
      
      responseHandler(JSON.parse(request.responseText));      
    }
    else {
      console.log(4);
      
      responseHandler(request.responseText);
    }
  }
}


// Expose utility to the global object
global.$ajaxUtils = ajaxUtils;


})(window);

