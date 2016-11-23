// Required libraries
var express = require('express');
var bind = require('bind');
var util = require('util');
var bodyParser = require('body-parser');
var serverConfig = require('./serverConfig.js');
var model = require('./model.js');

var app = express();

app.use(bodyParser.urlencoded({extended: true}));    // to support URL-encoded bodies

app.set("port", (process.env.PORT || serverConfig.port));

// with the following we allow the access to static contents
// that are in the script folder but via another name, in this
// case 'scripts'
app.use("/scripts", express.static(__dirname + "/script"));

// accpeting all the get request of the form http://localhost:port/
// and setting the proper callback function
app.get("/"
	, function (request, response)
	  {
	  	// in this case we produce an html document from
	  	// a template but we leave all the parameters empty
	  	// because the user is requesting the home page
	    bind.toFile(
			'tpl/index.tpl'
			, {}
			, function (data)
			  {				
				response.writeHead(200, serverConfig.headers);
				response.end(data);
			  }
		);
	  	
	  }
);

app.listen(app.get('port'), serverConfig.address)