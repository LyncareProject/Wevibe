var createError = require('http-errors');
var express = require('express');
var path = require('path');

var indexRouter = require('./routes/index');

var app = express();

const PORT = 8080
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

app.use(function(req, res, next){
        if(!req.secure){
                res.redirect("https://"+ req.headers.host + req.url);
        }else{
                next();
        }
});

app.listen(PORT, () => {
        console.log(`App listening at http://localhost:${PORT}`);
}) 

module.exports = app;
