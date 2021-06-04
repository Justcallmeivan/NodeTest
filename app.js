var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

function reqListener () {
    console.log(this.responseText);
  }
  
  var oReq = new XMLHttpRequest();
  oReq.addEventListener("load", reqListener);
  oReq.open("GET", "http://www.example.org/example.txt");
  oReq.onload = function () {
    console.log(oReq.responseURL); // http://example.com/test
  };
  oReq.send();