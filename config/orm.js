// importing connection
var connection = require('../config/connection');

// Helper function for SQL syntax.
function printQuestionMarks(num) {
    var arr = [];
  
    for (var i = 0; i < num; i++) {
      arr.push("?");
    }
  
    return arr.toString();
  }
  
  // Helper function to convert object key/value pairs to SQL syntax
  function objToSql(ob) {
    var arr = [];
  
    // loop through the keys and push the key/value as a string int arr
    for (var key in ob) {
      var value = ob[key];
      // check to skip hidden properties
      if (Object.hasOwnProperty.call(ob, key)) {
        // if string with spaces, add quotations
        if (typeof value === "string" && value.indexOf(" ") >= 0) {
          value = "'" + value + "'";
        }
        arr.push(key + "=" + value);
      }
    }
  
    // translate array of strings to a single comma-separated string
    return arr.toString();
  }
  
// create ORM object for SQL statements
var orm = {
    // select all information from the burger table
    all: (tableInput, cb) => {
        var queryString = "SELECT * FROM " + tableInput;
        connection.query(queryString, (err, result) =>{
            if (err) {
                throw err;
            } 
            // invoke callback function and pass in the results
            cb(result);
        })
    },
    // insert a new burger when added
    create: (table, cols, vals, cb) => {
        // create an insert into sql query
        var queryString = "INSERT INTO " + table;

        // create the insert into input and values input
        queryString += " (";
        queryString += cols.toString();
        queryString += ") ";
        queryString += "VALUES (";
        queryString += printQuestionMarks(vals.length);
        queryString += ") ";

        console.log(queryString);

        connection.query(queryString, vals, (err, result) => {
            if (err) {
                throw err;
            }
            // invoke callback function and pass in results
            cb(result);
        })
    },
    // create function to update burger to be devoured > boolean logic changes
    update: (table, objColVals, condition, cb) => {
        // create a update query
        var queryString = "UPDATE " + table;

        // create insert into inputs and values
        queryString += " SET ";
        queryString += objToSql(objColVals);
        queryString += " WHERE ";
        queryString += condition;

        console.log(queryString);
        connection.query(queryString, (err, result) => {
            if (err) {
                throw err;
            }
            // invoke callback function with result
            cb(result);
        })
    }
};

// export ORM object
module.exports = orm;