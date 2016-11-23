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

// accpeting all the post request of the form http://localhost:port/modify
// and setting the proper callback function
app.post("/modify"
	, function (request, response)
	  {
	  	// boolean value that allow to recognize at the end
	  	// of the elaboration if any errors occured
	  	var error = false; 

	  	// variable that stores all the paramters 
	  	// that will be binded to the template
	  	var params = {};
	  	
	  	// if a body is prensent in the request and is not empty
	  	if( typeof request.body !== 'undefined' && request.body)
	    {	
	    	// if a emp_id parameter is prensent in the request
	    	if( typeof request.body.emp_id !== 'undefined')
		    {
		    	var id;
		    	// if the emp_id parameter is empty
		    	if(!request.body.emp_id)
		    	{
		    		// if the id filed is empty we look for the
		    		// maximum id already given to an employee, so this
		    		// value +1 will become the id of the new employee
		    		var max = 0;
		    		for (var property in model.employees) {
				    	if (model.employees.hasOwnProperty(property)) {
					        var val = parseInt(property);
					        if (val > max) 
					        {
					        	max = val;
					        }
					    }
					}

					id = max + 1;
		    	}
		    	else
		    	{
		    		// otherwise we get the integer from the parameter
		    		id = parseInt(request.body.emp_id);
		    	}
		    	
		    	// if no errors occured up to this point
		    	// we get all the parameters in the request
		    	if(!error)
		    	{
		    		var name;
			    	var surname;
			    	var level;
			    	var salary;		    	

			    	// in the followings if else statments we control for each
			    	// parameters if it is present and not empty(and in the case of
			    	// id, level and salary that it is an integer), if it is the case we
			    	// continue with the next parameter, otherwise we return an error that will
				   	// be binded to the template
			    	if( typeof request.body.emp_name !== 'undefined' && request.body.emp_name)
				    {
				    	name = request.body.emp_name;
				    }
				    else
				    {
				    	error = true;
				    }

				    if( typeof request.body.emp_surname !== 'undefined' && request.body.emp_surname)
				    {
				    	surname = request.body.emp_surname;
				    }
				    else
				    {
				    	error = true;
				    }

				    if( typeof request.body.emp_lv !== 'undefined' && request.body.emp_lv)
				    {
				    	level = parseInt(request.body.emp_lv);
				    }	
				    else
				    {
				    	error = true;
				    }

			    	if( typeof request.body.emp_salary !== 'undefined' && request.body.emp_salary)
				    {
				    	salary = parseInt(request.body.emp_salary);
				    }	
				    else
				    {
				    	error = true;
				    }				    

				    // if all the parameters are present we insert
				    // the employee(if it is a new employee) or we 
				    // modify his or her data
				    if(!error)
				    {
					    model.insertModifyEmployee(id, name, surname, level, salary);
				    }
				    else
				    {
				    	// otherwise we provide an error message that will
				    	// be binded to the template
				    	params['formVisibility'] = 'style="display:block;"';
				    }
		    	}
		    }
		    else
		    {
		    	error = true;
		    }	
	    }

	    // with the results of the operations performed
	    // we fill the template and we return it to the user
	    bind.toFile(
			'tpl/index.tpl'
			, params
			, function (data)
			  {				
				response.writeHead(200, serverConfig.headers);
				response.end(data);
			  }
		);
	  	
	  }
);

app.listen(app.get('port'), serverConfig.address)