var express = require('express');
var SignalRJS = require('signalrjs');
 
//Init SignalRJs 
var signalR = SignalRJS();
 
//Create the hub connection 
//NOTE: Server methods are defined as an object on the second argument 
signalR.hub('chatHub',{
    send : function(userName,message){
        this.clients.all.invoke('broadcast').withArgs([userName,message])
        console.log('send:'+message);
    }
});
 
var server = express();
server.use(function(req, res, next) {
	  res.header("Access-Control-Allow-Origin", "http://localhost:8000");
	  res.header("Access-Control-Allow-Credentials", true);
	  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, OPTIONS, DELETE");
	  next();
	});
server.use(express.static(__dirname));
server.use(signalR.createListener())
server.listen(3000);