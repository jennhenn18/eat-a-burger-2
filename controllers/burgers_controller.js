// import all the shiz and create router
var express = require('express');

var router = express.Router();

var burger = require('../models/burger');

// time to create all the routes

// First HTML Routes

router.get('/', (req, res) => {
    // call the burger database function to return the table data
    burger.all((data) => {
        console.log(data);
        // render the index handlebar file with the burger data from the database
        res.render('index', {burgers: data})
    });
});

// Second API Routes


// create API route to add a new burger to the database
router.post('/api/burgers', (req, res) => {
    burger.create(['burger_name'], [req.body.name], (result) => {
        // send back the JSON data of the new burger
        res.json({ id: result.name })
    });
});

// create API route to update the burger when it is devoured
router.put('/api/burgers/:id', (req, res) => {
    console.log(req.body)
    console.log(req.params)
    var condition = 'id=' + req.params.id;
    console.log('condition', condition);

    burger.update(
        {
            devoured: true
        },
        condition,
        (result) => {
            // if no rows are changed return a 404 error
            if (result.changedRows === 0) {
                return res.status(404).end();
            }
            // if rows are changed return a success code and end the connection
            res.status(200).end();
        }
    );
});

// export router
module.exports = router;