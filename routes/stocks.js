/**
Stock Details REST API.
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
//this will be accessible from http://127.0.0.1:3000/stocks if the default route for / is left unchanged
router.route('/')
    //GET all stocks
    .get(function(req, res, next) {
        //retrieve all blobs from Monogo
        mongoose.model('Stock').find({}, function (err, stocks) {
              if (err) {
                  return console.error(err);
              } else {
                        res.json(stocks);
              }
        });
    })
    //POST a new stock
    .post(function(req, res) {
        // Get values from POST request. These can be done through forms or REST calls. These rely on the "name" attributes for forms
        var custcode = req.body.custcode;
    	var barcode = req.body.barcode; 
		var billno = req.body.billno;
		var billdate = req.body.billdate;
        var pcs = req.body.pcs;
        var sign = req.body.sign;
		var stone_wt = req.body.stone_wt;		
        var gross_wt = req.body.gross_wt; 
		var net_wt = req.body.net_wt;
        var purity_wt = req.body.purity_wt; 
        var rate = req.body.rate;
		var amount = req.body.amount;    	
    	var making = req.body.making;
		var extra = req.body.extra;
		var totalamt = req.body.totalamt;
		var discount = req.body.discount;
		var vat = req.body.vat;
		var invoiceval = req.body.invoiceval;    	
    	
        //call the create function for our database
        mongoose.model('Stock').create({
        	custcode : custcode,
            barcode : barcode,
            billno : billno,
        	billdate : billdate,
            pcs : pcs,
            sign : sign,
			stone_wt : stone_wt,	
            gross_wt : gross_wt,
			net_wt : net_wt,		
            purity_wt : purity_wt, 
            rate : rate,
			amount : amount,
			making : making,
			extra : extra,
			totalamt : totalamt,
			discount : discount,
			vat : vat,
			invoiceval : invoiceval
        }, function (err, stock) {
              if (err) {
                  res.send("There was a problem adding the information to the database.");
              } else {
                  //Blob has been created
                  console.log('POST creating new stock: ' + stock);
                  res.format({
                      //HTML response will set the location and redirect back to the home page. You could also create a 'success' page if that's your thing
                    html: function(){
                        // If it worked, set the header so the address bar doesn't still say /adduser
                        res.location("stocks");
                        // And forward to success page
                        res.redirect("/stocks");
                    },
                    //JSON response will show the newly created blob
                    json: function(){
                        res.json(stock);
                    }
                });
              }
        })
    });


/* GET New stock page. */
router.get('/new', function(req, res) {
    res.render('stocks/new', { title: 'Add New stock' });
});

// route middleware to validate :id
router.param('id', function(req, res, next, id) {
    //console.log('validating ' + id + ' exists');
    //find the ID in the Database
    mongoose.model('Stock').findById(id, function (err, stock) {
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
            // once validation is done save the new stock in the req
            req.id = id;
            // go to the next thing
            next();
        }
    });
});

router.route('/:id')
  .get(function(req, res) {
    mongoose.model('stock').findById(req.id, function (err, stock) {
      if (err) {
        console.log('GET Error: There was a problem retrieving: ' + err);
      } else {
        console.log('GET Retrieving ID: ' + stock._id);
        var billingdate = stock.billdate.toISOString();
        billingdate = stock.substring(0, billingdate.indexOf('T'))        
        res.format({
          html: function(){
              res.render('stocks/show', {
            	"billingdate" : billingdate,
                "stock" : Stock
              });
          },
          json: function(){
              res.json(stock);
          }
        });
      }
    });
  });

router.route('/:id/edit')
	//GET the individual blob by Mongo ID
	.get(function(req, res) {
	    //search for the blob within Mongo
	    mongoose.model('stock').findById(req.id, function (err, stock) {
	        if (err) {
	            console.log('GET Error: There was a problem retrieving: ' + err);
	        } else {
	            //Return the blob
	            console.log('GET Retrieving ID: ' + stock._id);
	            var billingdate = stock.billdate.toISOString();
	            billingdate = stock.substring(0, billingdate.indexOf('T'))
	            res.format({
	                //HTML response will render the 'edit.jade' template
	                html: function(){
	                       res.render('stocks/edit', {
	                          title: 'stock' + stock._id,
                              "billingdate" : billingdate,
	                          "stock" : stock
	                      });
	                 },
	                 //JSON response will return the JSON output
	                json: function(){
	                       res.json(stock);
	                 }
	            });
	        }
	    });
	})
	//PUT to update a blob by ID
	.put(function(req, res) {
	    // Get our REST or form values. These rely on the "name" attributes
        var custcode = req.body.custcode;
    	var barcode = req.body.barcode; 
		var billno = req.body.billno;
		var billdate = req.body.billdate;
        var pcs = req.body.pcs;
        var sign = req.body.sign;
		var stone_wt = req.body.stone_wt;		
        var gross_wt = req.body.gross_wt; 
		var net_wt = req.body.net_wt;
        var purity_wt = req.body.purity_wt; 
        var rate = req.body.rate;
		var amount = req.body.amount;    	
    	var making = req.body.making;
		var extra = req.body.extra;
		var totalamt = req.body.totalamt;
		var discount = req.body.discount;
		var vat = req.body.vat;
		var invoiceval = req.body.invoiceval;    	
    	
	    //find the document by ID
	    mongoose.model('Stock').findById(req.id, function (err, stock) {
	        //update it
	        stock.update({
	        	custcode : custcode,
	            barcode : barcode,
	            billno : billno,
	        	billdate : billdate,
	            pcs : pcs,
	            sign : sign,
				stone_wt : stone_wt,	
	            gross_wt : gross_wt,
				net_wt : net_wt,		
	            purity_wt : purity_wt, 
	            rate : rate,
				amount : amount,
				making : making,
				extra : extra,
				totalamt : totalamt,
				discount : discount,
				vat : vat,
				invoiceval : invoiceval	
	        }, function (err, stockID) {
	          if (err) {
	              res.send("There was a problem updating the information to the database: " + err);
	          }
	          else {
	                  //HTML responds by going back to the page or you can be fancy and create a new view that shows a success page.
	                  res.format({
	                      html: function(){
	                           res.redirect("/stock/" + stock._id);
	                     },
	                     //JSON responds showing the updated values
	                    json: function(){
	                           res.json(stock);
	                     }
	                  });
	           }
	        })
	    });
	})
	//DELETE a Blob by ID
	.delete(function (req, res){
	    //find blob by ID
	    mongoose.model('stock').findById(req.id, function (err, stock) {
	        if (err) {
	            return console.error(err);
	        } else {
	            //remove it from Mongo
	            stock.remove(function (err, stock) {
	                if (err) {
	                    return console.error(err);
	                } else {
	                    //Returning success messages saying it was deleted
	                    console.log('DELETE removing ID: ' + stock._id);
	                    res.format({
	                        //HTML returns us back to the main page, or you can create a success page
	                          html: function(){
	                               res.redirect("/stocks");
	                         },
	                         //JSON returns the stock with the message that is has been deleted
	                        json: function(){
	                               res.json({message : 'deleted',
	                                   stock : stock
	                               });
	                         }
	                      });
	                }
	            });
	        }
	    });
	});

module.exports = router;
