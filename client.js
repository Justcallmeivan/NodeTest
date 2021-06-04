var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
XMLHttpRequest.DONE = 4;

//client

// this deals with the servers request
function onPostServerResponse() {
    console.log("Post Server Response", this.status);
    console.log(httpPostRequest.responseText);
    console.log(httpPostRequest.readyState);
    console.log(XMLHttpRequest.DONE);
    if (httpPostRequest.readyState == XMLHttpRequest.DONE) {
      // at this point the server should have handled the request
  
      //printButton.parentNode.removeChild(printButton); // remove the print button
  
      // if server sends back an okay and a sucess that means everything printed
      if (httpPostRequest.status === 200 && httpPostRequest.responseText === "success") {
        // change the text to the fact that request was sent to printer
        console.log("POST SUCCESS SEEN");
      }
      // else means that most lilkey the server is not online (I cant think of any other problems)
      else {
        // explain that the server is down and and show a link to an internal webpage on how to fix it
        console.log("POST is fail");
      }
    }
}

const urls = ["http://localhost:3000/", "http://localhost:4000/"];


var startTime = new Date().getTime();
var successes = [0, 0];//no need
var errors = [];
httpGetRequests = [];



//get requests
for (i = 0; i < urls.length; i ++){
    httpGetRequests.push(new XMLHttpRequest());
    httpGetRequests[i].timeout = 5000; // time in milliseconds
    httpGetRequests[i].urlBase = urls[i];
    httpGetRequests[i].id = i;
    errors.push(0);

    httpGetRequests[i].ontimeout = function (e) {
        // XMLHttpRequest timed out. 
        console.log("Timeout at: ", this.urlBase);
      };
    //httpGetRequest.onreadystatechange = this.onServerResponse;
    //replacing with addeventlistener
    httpGetRequests[i].onerror = function () {
        console.log("ERROR occurred during GET request to: ", this.urlBase);
        errors[this.id] = 1;
        //if all requests ended in an error, then something must be wrong with server connection
        if (errors.reduce((a, b) => a + b, 0) == urls.length){
            console.log("Big ERROR, server not responding.");
        }

    };
    httpGetRequests[i].addEventListener("readystatechange", function(){
        console.log("url: ", this.urlBase);
        console.log(this.urlBase, "Status ", this.status);
    });
    //Needs to not be anonymous so that index can be passed properly for determining which get request succeeded
    httpGetRequests[i].addEventListener("load", function(){
        console.log("load");
        console.log(this.responseText);
        console.log(this.status);
        console.log(this.urlBase);

        if (this.status === 200 && this.responseText === "Success!") {
            json = {
                "first_name": "Bob",
                "last_name": "A",
                "email": "monkey@gmail.com",
                "papercut_num": "12345678",
                "cost": "$5.00"
            }
            //push
            httpPostRequest = new XMLHttpRequest();
            console.log(this.urlBase);
            httpPostRequest.open("POST", this.urlBase, true);
            // this will invoke onServerResponse() when server responds
            httpPostRequest.onreadystatechange = onPostServerResponse;
            //httpPostRequest.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            httpPostRequest.send(JSON.stringify(json));
            
        }
    });
    console.log(urls[i].concat("validation"));
    httpGetRequests[i].open("GET", urls[i].concat("validation"), true);
    // because all the paremeters are sent in the URL, no method body needed
    httpGetRequests[i].send(null);
}


// console.log("waiting");
// while (!successes.includes(1) && new Date().getTime() - startTime < 5000){
//     //console.log(new Date().getTime());
// }
// console.log("aborting gets");
// //abort all requests
// httpGetRequests.forEach(function(req){
//     req.abort();//typecasting might be nice here
// });

//did a GET ping successfully receive a response from a server
// if (successes.includes(1)){
    
// } else {
//     console.log("bad");
//     // explain that the server is down and and show a link to an internal webpage on how to fix it
//     // document.getElementById('DymoErrorText').innerHTML = "Server Down.. <br/>" +
//     // "Are you connected to Terrapin Works Wifi?";
//     // document.body.style.width = '300px';
// }


// app.get('/validation', function(req, res) {
//     console.log('GET /');
//     res.send("Success!");
// });