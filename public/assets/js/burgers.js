// create function to wait till DOM has fully loaded
$(() => {
    // create a function for the submit button
    $('.create-form').on('submit', (e) => {
        e.preventDefault();

        // store the new burger in an object
        var newBurger = {
            name: $('#burgerName').val().trim()
        };

        console.log(newBurger)

        // send new burger to the database through a POST method
        $.ajax('/api/burgers', {
            type: 'POST',
            data: newBurger
        }).then(() => {
            console.log('new burger created');
            // reload the page
            location.reload();
        });
    });

    // create function to update boolean logic when devour it is clicked
    $('.devour-it').on('click', function(e) {
        e.preventDefault();
        // store the id and devourit value
        var id = $(this).attr('id');
        var devoured = $(this).data('devourit');
        // console.log(this);
        console.log(id);
        console.log(devoured);
        // console.log(e);

        // create object to send data through AJAX call
        var devourIt = {
            devoured: devoured
        }
        
        // send PUT request to update database
        $.ajax('/api/burgers/' + id, {
            type: 'PUT',
            data: devourIt
        }).then(() => {
            console.log('you devoured the burger!', devourIt)
            // reload the page
            location.reload();
        });
    });
});