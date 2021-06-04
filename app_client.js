var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

function reqListener () {
    //console.log(this.responseText);
    console.log(this.status);
    console.log(this.statusText);
  }
  httpGetRequests = [];
  httpGetRequests.push(new XMLHttpRequest());
  httpGetRequests[0].timeout = 5000;
  httpGetRequests[0].onerror = function () {
    console.log("** An error occurred during the transaction");
  };
  //var oReq = new XMLHttpRequest();
  httpGetRequests[0].addEventListener("readystatechange", reqListener);
  httpGetRequests[0].open("GET", "http://localhost:4000/validation", true);
  httpGetRequests[0].send(null);