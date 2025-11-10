var express = require('express');
var fortune = require('./lib/fortune.js');

var app = express();

//Set up handlers view engine
//var fortunes = [
//    "Conquer your fears or they will conquer you.",
//    "Rivers need springs.",
//    "Do not fear what you don't know.",
//    "You will have a pleasant surprise.",
//    "Whenever possible, keep it simple.",
//];
var handlebars = require('express3-handlebars')
    .create({ defaultLayout: 'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + '/public'));


//middleware to detect test = 1
app.use(function(req, res, next){
    res.locals.showTests = app.get('env') != 'production' && req.query.test == '1';
    next();
});


app.set('port', process.env.PORT || 3000);


//routes definition
//cutom home page
app.get('/', function(req, res){
    //res.type('text/plain');
    res.render('home');
    //res.send('Meadowlark Travel');
});

//custom about page
app.get('/about', function(req, res){
    //res.type('text/plain');
    //res.send('About Meadowlark Travel');
   // var randomFortune = 
   //     fortunes[Math.floor(Math.random() * fortunes.length)];
    res.render('about', { fortune: fortune.getFortune() });
});

//custom about contact page
app.get('/about/contact', function(req, res){
    //res.type('text/plain');
    //res.send('Contact Meadowlark Travel');
    res.render('contact', {
        fortune: fortune.getFortune(), pageTestScript: '/qa/tests-about.js'
    });
});

//custom 404 page
app.use(function(req, res){
    //res.type('text/plain');
    res.status(404);
    res.render('404');
    //res.send('404 - Not Found')
});

//custom 500 page
app.use(function(err, req, res, next){
    console.error(err.stack);
    //res.type('text/plain');
    res.status(500);
    //res.send('500 - Server Error');
    res.render('500');
})

app.listen(app.get('port'), function(){
    console.log('Express started on http://localhost:' +
        app.get('port') + '; press Ctrl-C to terminate.' );
});