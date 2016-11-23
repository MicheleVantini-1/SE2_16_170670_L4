/**
* This function creates a form with the information
* provided by the user in the search field, but this
* function allows to distinguish between search 
* actions and delete actions
+ @param searchBool true in case of search; false in case of delete
*/
function search(searchBool) {
    var form = document.createElement("form");

    var search = document.createElement("input"); 
    search.type = "text";
    search.value = document.getElementById("employee_search").value;
    search.name = "employee_search";
    search.id = "employee_search";
    
    var isSearch = document.createElement("input");  
    isSearch.type = "text";
    isSearch.value = searchBool;
    isSearch.name = "isSearch";
    isSearch.id = "isSearch";
    
    form.appendChild(search);  
    form.appendChild(isSearch);

    form.method = "POST";
    form.action = "http://localhost:8080/search"; 
    form.submit();
}

/**
* This function does all the necessary checks
* on all the field of the insert/modify form
* and if everything is ok submits the form, otherwise
* shows all the required error messages
*/
function insertModifySubmit()
{
    // here we will put the different checks on the input fields

    document.getElementById("insertModifyForm").submit();
}

/**
* This function controls the visibility of the
* insert/modify form 
*/
function showHideEmployeeForm()
{
    if(document.getElementById("insertModifyForm").style.display == "none")
    {
        document.getElementById("insertModifyForm").style.display = "block";
    }
    else
    {
        document.getElementById("insertModifyForm").style.display = "none";        
    }
}
