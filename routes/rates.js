/**
 * Author: Sanjay Kumar Verma
 * Date: 31st July, 2016
 * 
Rate Details REST API.
*/

 var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'), //mongo connection
    bodyParser = require('body-parser'), //parses information from POST
    methodOverride = require('method-override'); //used to manipulate POST

//Any requests to this controller must pass through this 'use' function
//Copy and pasted from method-override
router.use(bodyParser.urlencoded({ extended: true }))
router.use(methodOverride(function(req, res){
      if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        var method = req.body._method
        delete req.body._method
        return method
      }
}))

//build the REST operations at the base for blobs
//this will be accessible from http://127.0.0.1:3000/rates if the default route for / is left unchanged
router.route('/')
    //GET all rates
    .get(function(req, res, next) {
        //retrieve all blobs from Monogo
        mongoose.model('Rate').find({}, function (err, rates) {
              if (err) {
                  return console.error(err);
              } else {
                        res.json(rates);
              }
        });
    })
    //POST a new rate
    .post(function(req, res) {
        // Get values from POST request. These can be done through forms or REST calls. These rely on the "name" attributes for forms
    	var date = req.body.date;
    	var description = req.body.descr;
    	var purity = req.body.purity;
    	var rate = req.body.rate;   	
    	
        //call the create function for our database
        mongoose.model('Rate').create({
        	date : date,
        	description : description,
        	purity : purity,
        	rate : rate
        }, function (err, rate) {
              if (err) {
                  res.send("There was a problem adding the information to the database.");
              } else {
                  //Blob has been created
                  console.log('POST creating new rate: ' + rate);
                  res.format({
                      //HTML response will set the location and redirect back to the home page. You could also create a 'success' page if that's your thing
                    html: function(){
                        // If it worked, set the header so the address bar doesn't still say /adduser
                        res.location("rates");
                        // And forward to success page
                        res.redirect("/rates");
                    },
                    //JSON response will show the newly created blob
                    json: function(){
                        res.json(rate);
                    }
                });
              }
        })
    });


/* GET New rate page. */
router.get('/new', function(req, res) {
    res.render('rates/new', { title: 'Add New rate' });
});

// route middleware to validate :id
router.param('id', function(req, res, next, id) {
    //console.log('validating ' + id + ' exists');
    //find the ID in the Database
    mongoose.model('Rate').findById(id, function (err, rate) {
        //if it isn't found, we are going to repond with 404
        if (err) {
            console.log(id + ' was not found');
            res.status(404)
            var err = new Error('Not Found');
            err.status = 404;
            res.format({
                html: function(){
                    next(err);
                 },
                json: function(){
                       res.json({message : err.status  + ' ' + err});
                 }
            });
        //if it is found we continue on
        } else {
            //uncomment this next line if you want to see every JSON document response for every GET/PUT/DELETE call
            //console.log(blob);
            // once validation is done save the new rate in the req
            req.id = id;
            // go to the next thing
            next();
        }
    });
});

router.route('/:id')
  .get(function(req, res) {
    mongoose.model('rate').findById(req.id, function (err, rate) {
      if (err) {
        console.log('GET Error: There was a problem retrieving: ' + err);
      } else {
        console.log('GET Retrieving ID: ' + rate._id);
        var ratedate = rate.date.toISOString();
        ratedate = rate.substring(0, ratedate.indexOf('T'))     
        res.format({
          html: function(){
              res.render('rates/show', {
            	"ratedate" : ratedate,
                "rate" : Rate
              });
          },
          json: function(){
              res.json(rate);
          }
        });
      }
    });
  });

router.route('/:id/edit')
	//GET the individual blob by Mongo ID
	.get(function(req, res) {
	    //search for the blob within Mongo
	    mongoose.model('rate').findById(req.id, function (err, rate) {
	        if (err) {
	            console.log('GET Error: There was a problem retrieving: ' + err);
	        } else {
	            //Return the blob
	            console.log('GET Retrieving ID: ' + rate._id);
	            var ratedate = rate.date.toISOString();
	            ratedate = rate.substring(0, ratedate.indexOf('T'))
	            res.format({
	                //HTML response will render the 'edit.jade' template
	                html: function(){
	                       res.render('rates/edit', {
	                          title: 'rate' + rate._id,
                              "ratedate" : ratedate,
	                          "rate" : rate
	                      });
	                 },
	                 //JSON response will return the JSON output
	                json: function(){
	                       res.json(rate);
	                 }
	            });
	        }
	    });
	})
	//PUT to update a blob by ID
	.put(function(req, res) {
	    // Get our REST or form values. These rely on the "name" attributes
    	var date = req.body.date;
    	var description = req.body.descr;
    	var purity = req.body.purity;
    	var rate = req.body.rate;   	
    	
	    //find the document by ID
	    mongoose.model('Rate').findById(req.id, function (err, rate) {
	        //update it
	        rate.update({
	        	date : date,
	        	description : description,
	        	purity : purity,
	        	rate : rate	
	        }, function (err, rateID) {
	          if (err) {
	              res.send("There was a problem updating the information to the database: " + err);
	          }
	          else {
	                  //HTML responds by going back to the page or you can be fancy and create a new view that shows a success page.
	                  res.format({
	                      html: function(){
	                           res.redirect("/rate/" + rate._id);
	                     },
	                     //JSON responds showing the updated values
	                    json: function(){
	                           res.json(rate);
	                     }
	                  });
	           }
	        })
	    });
	})
	//DELETE a Blob by ID
	.delete(function (req, res){
	    //find blob by ID
	    mongoose.model('rate').findById(req.id, function (err, rate) {
	        if (err) {
	            return console.error(err);
	        } else {
	            //remove it from Mongo
	            rate.remove(function (err, rate) {
	                if (err) {
	                    return console.error(err);
	                } else {
	                    //Returning success messages saying it was deleted
	                    console.log('DELETE removing ID: ' + rate._id);
	                    res.format({
	                        //HTML returns us back to the main page, or you can create a success page
	                          html: function(){
	                               res.redirect("/rates");
	                         },
	                         //JSON returns the rate with the message that is has been deleted
	                        json: function(){
	                               res.json({message : 'deleted',
	                                   rate : rate
	                               });
	                         }
	                      });
	                }
	            });
	        }
	    });
	});

module.exports = router;
