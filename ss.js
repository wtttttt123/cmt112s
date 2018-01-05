const fs=require('fs')
const url =require('url');
const http=require('http');


var return_Html=function(filename,response){
	fs.readFile(filename,function(error,data){
		if (error){
			response.writeHead(404);
			response.end()
		}
		response.writeHead(200,{
			'Content-Type':'text/html'
		});
		response.end(data)	
	})
};

var return_JSON=function(data,response){
	response.writeHead(200,{
		'Content-Type':'application/json'
	});
	response.end(JSON.stringify(data));
};


var server=http.createServer(function(request,response) {
	console.log(request.url);
	var u=url.parse(request.url);
	if(u.pathname==='/'){
		return_Html('index.html',response);
	}else if (u.pathname==='/hello'){
	return_JSON("Hello",response);
	}else if (u.pathname==='/goodbye'){
		return_JSON("goodybye",response);
	}else if (u.pathname==='/main.html'){
		return_Html("main.html",response);
	}else if (u.pathname==='/login.html'){
		return_Html("login.html",response);
	}else{
		response.end();
	}
});



server.listen(8000,'127.0.0.1',function(){
	console.log('server started');

});