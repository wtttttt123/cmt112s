const path=require('path');
const express=require('express');
// const moment =require('moment');


var server=express();

server.use(express.static(path.join(__dirname,'static')));

server.get('hello',function(request,response){
	response.json('hello');
});


server.listen(8000);
module.exports=server;