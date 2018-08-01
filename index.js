// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var translate = require('google-translate-api');
// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    translate(req.body.text, {from: req.body.language_from, to: req.body.language_to}).then(response => {
        res.json({
            "text": {
                "from": req.body.text,
                "to": response.text
            },
            "language": {
                "to":req.body.language_to,
                "from": req.body.language_from
            }
        });
     
    }).catch(err => {
        res.json(err);
    });
       
});

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/', router);

// START THE SERVER
// =============================================================================
app.listen(port);
//console.log('Magic happens on port ' + port);
