// import ORM object
var orm = require('../config/orm');

// create burger object to interact with ORM object
var burger = {
    // create key value pair to match select all key in ORM object
    all: (cb) => {
        orm.all('burgers', (res) => {
            cb(res);
        });
    },
    // create key/value pair to match create key in ORM object
    create: (cols, vals, cb) => {
        // call ORM object and pass in the column, volume and invoke the callback function to return the response
        orm.create('burgers', cols, vals, (res) => {
            cb(res);
        });
    },
    // create key/value pair to match the update key in ORM object
    update: (objColVals, condition, cb) => {
        // call ORM object and pass in the key/value pair to update the boolean logic
        orm.update('burgers', objColVals, condition, (res) => {
            cb(res);
        });
    }
};


// export burger object
module.exports = burger;