/**
 * Author: Sanjay Kumar Verma
 * Date: 30th July, 2016
 * 
Item Details REST API.
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
//this will be accessible from http://127.0.0.1:3000/items if the default route for / is left unchanged
router.route('/')
    //GET all items
    .get(function(req, res, next) {
        //retrieve all blobs from Monogo
        mongoose.model('Item').find({}, function (err, items) {
              if (err) {
                  return console.error(err);
              } else {
                        res.json(items);
              }
        });
    })
    //POST a new item
    .post(function(req, res) {
        // Get values from POST request. These can be done through forms or REST calls. These rely on the "name" attributes for forms
        var item = req.body.item; 
        var barcode = req.body.barcode; 
        var pcs = req.body.pcs; 
        var gross_wt = req.body.gross_wt; 
        var pmaking = req.body.pmaking; 
        var ppolish = req.body.ppolish; 
        var pextra_gd = req.body.pextra_gd; 
        var prate = req.body.prate; 
        var purity = req.body.purity; 
        var smaking = req.body.smaking; 
        var spolish = req.body.spolish; 
        var sextra_gd = req.body.sextra_gd; 
        var srate = req.body.srate;     	
    	
        //call the create function for our database
        mongoose.model('Item').create({
            item : item, 
            barcode : barcode, 
            pcs : pcs, 
            gross_wt : gross_wt, 
            pmaking : pmaking, 
            ppolish : ppolish, 
            pextra_gd : pextra_gd, 
            prate : prate, 
            purity : purity, 
            smaking : smaking, 
            spolish : spolish, 
            sextra_gd : sextra_gd, 
            srate : srate
        }, function (err, item) {
              if (err) {
                  res.send("There was a problem adding the information to the database.");
              } else {
                  //Blob has been created
                  console.log('POST creating new item: ' + item);
                  res.format({
                      //HTML response will set the location and redirect back to the home page. You could also create a 'success' page if that's your thing
                    html: function(){
                        // If it worked, set the header so the address bar doesn't still say /adduser
                        res.location("items");
                        // And forward to success page
                        res.redirect("/items");
                    },
                    //JSON response will show the newly created blob
                    json: function(){
                        res.json(item);
                    }
                });
              }
        })
    });


/* GET New item page. */
router.get('/new', function(req, res) {
    res.render('items/new', { title: 'Add New item' });
});

// route middleware to validate :id
router.param('id', function(req, res, next, id) {
    //console.log('validating ' + id + ' exists');
    //find the ID in the Database
    mongoose.model('Item').findById(id, function (err, item) {
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
            // once validation is done save the new item in the req
            req.id = id;
            // go to the next thing
            next();
        }
    });
});

router.route('/:id')
  .get(function(req, res) {
    mongoose.model('item').findById(req.id, function (err, item) {
      if (err) {
        console.log('GET Error: There was a problem retrieving: ' + err);
      } else {
        console.log('GET Retrieving ID: ' + item._id);
        //var customerdob = customer.dob.toISOString();
        //customerdob = customerdob.substring(0, customerdob.indexOf('T'))
        res.format({
          html: function(){
              res.render('items/show', {
                //"customerdob" : customerdob,
                "item" : Item
              });
          },
          json: function(){
              res.json(item);
          }
        });
      }
    });
  });

router.route('/:id/edit')
	//GET the individual blob by Mongo ID
	.get(function(req, res) {
	    //search for the blob within Mongo
	    mongoose.model('item').findById(req.id, function (err, item) {
	        if (err) {
	            console.log('GET Error: There was a problem retrieving: ' + err);
	        } else {
	            //Return the blob
	            console.log('GET Retrieving ID: ' + item._id);
              //var customerdob = customer.dob.toISOString();
              //customerdob = customer.substring(0, customerdob.indexOf('T'))
	            res.format({
	                //HTML response will render the 'edit.jade' template
	                html: function(){
	                       res.render('items/edit', {
	                          title: 'item' + item._id,
                            //"customerdob" : customerdob,
	                          "item" : item
	                      });
	                 },
	                 //JSON response will return the JSON output
	                json: function(){
	                       res.json(item);
	                 }
	            });
	        }
	    });
	})
	//PUT to update a blob by ID
	.put(function(req, res) {
	    // Get our REST or form values. These rely on the "name" attributes
        var item = req.body.item; 
        var barcode = req.body.barcode; 
        var pcs = req.body.pcs; 
        var gross_wt = req.body.gross_wt; 
        var pmaking = req.body.pmaking; 
        var ppolish = req.body.ppolish; 
        var pextra_gd = req.body.pextra_gd; 
        var prate = req.body.prate; 
        var purity = req.body.purity; 
        var smaking = req.body.smaking; 
        var spolish = req.body.spolish; 
        var sextra_gd = req.body.sextra_gd; 
        var srate = req.body.srate;     	
    	
	    //find the document by ID
	    mongoose.model('Item').findById(req.id, function (err, item) {
	        //update it
	        item.update({
	            item : item, 
	            barcode : barcode, 
	            pcs : pcs, 
	            gross_wt : gross_wt, 
	            pmaking : pmaking, 
	            ppolish : ppolish, 
	            pextra_gd : pextra_gd, 
	            prate : prate, 
	            purity : purity, 
	            smaking : smaking, 
	            spolish : spolish, 
	            sextra_gd : sextra_gd, 
	            srate : srate
	        }, function (err, itemID) {
	          if (err) {
	              res.send("There was a problem updating the information to the database: " + err);
	          }
	          else {
	                  //HTML responds by going back to the page or you can be fancy and create a new view that shows a success page.
	                  res.format({
	                      html: function(){
	                           res.redirect("/item/" + item._id);
	                     },
	                     //JSON responds showing the updated values
	                    json: function(){
	                           res.json(item);
	                     }
	                  });
	           }
	        })
	    });
	})
	//DELETE a Blob by ID
	.delete(function (req, res){
	    //find blob by ID
	    mongoose.model('item').findById(req.id, function (err, item) {
	        if (err) {
	            return console.error(err);
	        } else {
	            //remove it from Mongo
	            item.remove(function (err, item) {
	                if (err) {
	                    return console.error(err);
	                } else {
	                    //Returning success messages saying it was deleted
	                    console.log('DELETE removing ID: ' + item._id);
	                    res.format({
	                        //HTML returns us back to the main page, or you can create a success page
	                          html: function(){
	                               res.redirect("/items");
	                         },
	                         //JSON returns the item with the message that is has been deleted
	                        json: function(){
	                               res.json({message : 'deleted',
	                                   item : item
	                               });
	                         }
	                      });
	                }
	            });
	        }
	    });
	});

module.exports = router;
