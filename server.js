var app = require('./app');
var port = require('./config').PORT;

var server = app.listen(port, ()=>{
    console.log('Express server listening on port ' + port);
});