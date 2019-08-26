// from data.js
var tableData = data;
console.log(`The number of items in the data object is ${Object.keys(tableData).length}`);

// YOUR CODE HERE!
// Level 1: Automatic Table and Date Search
// Using the UFO dataset provided in the form of an array of JavaScript objects,
// write code that appends a table to your web page and then adds new rows of data for each UFO sighting.
// Make sure you have a column for `date/time`, `city`, `state`, `country`, `shape`, and `comment` at the very least.

// Select the button
var button = d3.select("#filter-btn");
//console.log(button);

button.on("click", function () {

    // Select the input elements and get the raw HTML node
    var inputElement_date = d3.select("#datetime");
    var inputElement_city = d3.select("#city1");
    var inputElement_state = d3.select("#state1");
    var inputElement_country = d3.select("#country1");
    var inputElement_shape = d3.select("#shape1");

    // Get the value property of the input elements
    var inputValue_date = inputElement_date.property("value");
    var inputValue_city = inputElement_city.property("value");
    var inputValue_state = inputElement_state.property("value");
    var inputValue_country = inputElement_country.property("value");
    var inputValue_shape = inputElement_shape.property("value");

    var inputValues = [inputValue_date, inputValue_city, inputValue_state, inputValue_country, inputValue_shape];
    console.log(inputValues)

    // The code below checks to see if the user entered a date.  If so, the data is filtered based on the date.
    // If no date is entered, the data remains unchanged. 
    // Next, we check to usee if the user entered a city.  If so, the data is filtered based on whether a date was entered.
    // This continues through all of the input values on the form.
    // If the user does not enter any information on the form and hits the filter data button, all items in the data are returned.

    if (inputValue_date != ""){
        filteredData = tableData.filter(sighting => sighting.datetime === inputValue_date);
    }
    else {
        console.log("user did not enter a date");
        filteredData = tableData;
    }
  
    if (inputValue_city != ""){
        filteredData1 = filteredData.filter(sighting => sighting.city === inputValue_city);
    }
    else {
        console.log("user did not enter a city");
        filteredData1 = filteredData;
    }


    if (inputValue_state != ""){
        filteredData2 = filteredData1.filter(sighting => sighting.state === inputValue_state);
    }
    else {
        console.log("user did not enter a state");
        filteredData2 = filteredData1;
    }

    if (inputValue_country != ""){
        filteredData3 = filteredData2.filter(sighting => sighting.country === inputValue_country);
    }
    else {
        console.log("user did not enter a country");
        filteredData3 = filteredData2;
    }

    if (inputValue_shape != ""){
        filteredData4 = filteredData3.filter(sighting => sighting.shape === inputValue_shape);
    }
    else {
        console.log("user did not enter a shape");
        filteredData4 = filteredData3;
    }
    

    console.log(`The length of the filtered data based on what the user entered in the form, ie filteredData4,  ${filteredData4.length}`)
    console.log(`The items in filteredData4 are ${filteredData4}`)
 

    // // First, create arrays with just the values you want
    var dateTime = filteredData4.map(sighting => sighting.datetime);
    var city = filteredData4.map(sighting => sighting.city);
    var state = filteredData4.map(sighting => sighting.state);
    var country = filteredData4.map(sighting => sighting.country);
    var shape = filteredData4.map(sighting => sighting.shape);
    var duration = filteredData4.map(sighting => sighting.durationMinutes);
    var comment = filteredData4.map(sighting => sighting.comments);

    // // Then, select the table by class id
    var ufoTable = d3.select("ufo-table");
    // // delete any rows that exist in the table
    var tb = document.getElementById("ufo-table");
    //console.log(tb);
    while (tb.rows.length > 1) {
        tb.deleteRow(1);
        console.log("test");
     }

    for (var i = 1; i <= filteredData4.length; i++) {
        
        // add rows to a table
        var row = tb.insertRow(i);

        // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);
        var cell6 = row.insertCell(5);
        var cell7 = row.insertCell(6);



        // Add some text to the new cells:
        cell1.innerHTML = dateTime[i-1];
        cell2.innerHTML = city[i-1];
        cell3.innerHTML = state[i-1];
        cell4.innerHTML = country[i-1];
        cell5.innerHTML = shape[i-1];
        cell6.innerHTML = duration[i-1];
        cell7.innerHTML = comment[i-1];
    }
})


var button2 = d3.select("#clear-btn");
button2.on("click", function (){
    var ufoTable = d3.select("ufo-table");
    // // delete any rows that exist in the table
    var tb = document.getElementById("ufo-table");
    //console.log(tb);
    while (tb.rows.length > 1) {
        tb.deleteRow(1);
        console.log("test");
     }
     document.getElementById("shape1").value = '';
     document.getElementById("datetime").value = '';
     document.getElementById("city1").value = '';
     document.getElementById("country1").value = '';
     document.getElementById("state1").value = '';
 

})
