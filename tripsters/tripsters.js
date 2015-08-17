var express = require('express'),
	app = express();

app.set('port', process.env.PORT || 3000);

app.use(function(req, res){
	res.type('text/plain');
	res.status(404);
	res.send('404 - Not Found');
});

app.use(function(err, req, res, next){
	console.log(err.stack);
	res.type('text/plain');
	res.status(500);
	res.send('500 - Server Error');
});

app.listen(app.get('port'), function(){
	console.log('Express started on 23.39.1.241:' + app.get('port') + 'press Ctrl - C to terminate.');
});