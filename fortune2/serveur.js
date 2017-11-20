var http = require('http');
var url = require('url');

var server = http.createServer(function(req, res)
{
	var page = url.parse(req.url).pathname;
	console.log(page);
	res.writeHead(200, {"Content-Type": "text/html"});
	if (page == '/')
	{
        	res.write('page d\'accueil');
	}
	else if (page == '/fortune')
	{
		res.write('ecrire une fortune');
	}
	else if (page == '/fortune/test')
	{
		res.write('salut toi');
	}
	else
	{
		res.write('erreur 404')
	}
	res.end();
});
server.listen(8080);
