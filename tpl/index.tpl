<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>Employees</title>
	</head>
	<body>
		<h2> Employees manager </h2>
		<label>ID:</label><input type="numeric" name="employee_search" id="employee_search"/>
		<button onclick="search(true);">Search</button>
		<button onclick="search(false);">Delete</button>
		<br/><br/>
		<button onclick="showHideEmployeeForm();" >Show/Hide new emplyee form</button>
		<br/>
		<br/>
		<form action="http://localhost:8080/modify" method='POST' id="insertModifyForm" (: formVisibility ~ style="display:none;" :) >
			<label>ID:</label>
			<input type="numeric" name="emp_id" id="emp_id" (: id ~ :) />
			<br/>
			<label>Name:</label><input type="text" name="emp_name" id="emp_name" (: name ~ :)/> 
			<label>Surname:</label><input type="text" name="emp_surname" id="emp_surname" (: surname ~ :)/>
			<br/>
			<label>Level:</label><input type="numeric" name="emp_lv" id="emp_lv" (: level ~ :)/> 
			<br/>
			<label>Salary:</label><input type="numeric" name="emp_salary" id="emp_salary" (: salary ~ :)/> 
			<br/><br/>
			<button type="button" onclick="insertModifySubmit();">Insert/Modify</button>
		</form>

		<script src="scripts/script.js"></script>
	</body>
</html>