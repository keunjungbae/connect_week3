var datastore = require('nedb');
var db = new datastore({ filename: 'database.json', autoload: true });

var express = require('express')
var bodyParser = require('body-parser');

var app = express()


var urlencodedBodyParser = bodyParser.urlencoded({extended: true});
app.use(urlencodedBodyParser);

app.use(express.static('public'));

app.set('view engine', 'ejs');





app.post('/formpost', function (req, res) {
	var submission = req.body.textfield;
	console.log("They submitted: " + submission);
	res.render('template.ejs',{response:submission})
	// save submission into the database in the argument "saved"
	db.submissions.save({"submission":submission}, function(err, saved) {
		if( err || !saved ) console.log("Not saved");
		else console.log("Saved");
	  })
  })
  
  app.get('/display', function(req, res) {
	// pull all submissions from database to render on display file
	db.submissions.find({}, function(err, saved) {
		if (err || !saved) {
			  console.log("No results");
		  }
		else {
					 console.log(saved);
					 res.render('display.ejs',{submissions_on_page:saved});
		   }
	  })
  })


  




app.listen(8080, function () {
  console.log('App listening on port 8080!')
})