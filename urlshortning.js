var exp=require("express");
var mongoose =require('mongoose');
mongoose.connect('mongodb+srv://shivam:icecream123@cluster0-srsrf.mongodb.net/test?retryWrites=true&w=majority',{
useNewUrlParser:true,
useUnifiedTopology: true
});

// app.use(checkauth);

const  Data =require('./mongoose');
var short = require('short-uuid');
// var checkauth = require("./checkauth");

// var cors =require("cors");
var app = exp();
  // app.use(cors);
app.use(exp.json());

app.put('/update',(req,res)=>{
	if(req.body.flag === 0){
		Data.update({ "url" : req.body.url }, 
    {
      $set: {  "urlshort" : req.body.updateurl }
    })
.exec()
.then(data=>{
	res.send({"msg":"data updated","value":1});
})
.catch(error=>{
	res.send({"msg":"error occured during update","value":1});
})
}else{

Data.update({ "urlshort" : req.body.updateurl }, 
    {
      $set: {  "url" : req.body.url }
    })
.exec()
.then(data=>{
	res.send({"msg":"data updated","value":1});
})
.catch(error=>{
	res.send({"msg":"error occured during update","value":1});
})



}

})
app.delete('/delete',(req,res)=>{
Data.remove({'url':req.body.deleteurl})
.exec()
.then(data=>{
	if(data.deletedCount ===0){
		res.send({"msg":"create url first","value":1});
	}else{
		console.log(data);
		res.send({"msg":"url deleted ","value":1});
	}

})
.catch(error=>{
res.send({"msg":"error arrived during process"});
})
})
app.get('/',(req,res)=>{	
 res.sendFile(__dirname + "/index.html");

})
app.get('/retrive',(req,res)=>{
Data.find()
.exec()
.then(data=>{
res.send({"da":data,"value":2});
})
.catch(error=>{
res.send({"vaue":1});	
})
});
// 
app.get('/:param',(req,res)=>{
	// console.log(req.params.param +"klkl");	
Data.find({urlshort:req.params.param})
.exec()
.then(data=>{
	if(data.length === 0){
		// res.status(404).send({'msg':'create short url first','value':1});
	}else{
console.log("redirected");
	res.redirect(data[0].url);
// res.redirect(data.url);
	}
	
})
.catch(error=>{
res.status(404).send({'msg':'create short url first','value':1});
})
})

app.post('/short',(req,res)=>{
	console.log("done");
	// console.log(short.generate());
	console.log(req.body.url);
	if(!req.body.url){
		res.status(404).send({'msg':'you cannot add empty value','value':1});
	}else{
			Data.find({url:req.body.url})
			.exec()
			.then(data=>{
				if(data.length === 0){
			console.log(req.body.url);
			var e=  short.generate()
			var  data = new Data({
_id:new mongoose.Types.ObjectId(),
  url:req.body.url,
  urlshort:e
  });
						console.log(req.body.url);
data.save((err,data)=>{
if(err){
res.status(500).send({'msg':'check your network connectivity','value':1});
}else{
	res.status(201).send({'msg':'data saved successfully','value':0,'url':req.body.url,'shorturl':e});
}
});
				}else{
					res.send({"msg":"you have created shorturl before ,you can delete it or update it","value":1});
				}
			})
			.catch(error=>{
res.status(500).send({'msg':'check your network connectivity','value':1});
			})
	


	}

})

var port = process.env.PORT|3000; ///environment variable
app.listen(port,()=>{console.log(`listening to port ${port}`)});