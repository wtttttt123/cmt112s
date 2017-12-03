const path=require('path');
const express=require('express');
// const moment =require('moment');


var server=express();

server.use(express.static(path.join(__dirname,'static')));

// server.get('/event.html',function(request,response){
// 	var searchh=request.query.event;
// 	if (serachh===undefined){
// 		searchh="taylor swift"
// 	}
// 	return_Html("event.html",response);
// })

server.get('hello',function(request,response){
	response.json('hello');
});


server.listen(8000);
module.exports=server;