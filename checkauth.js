
module.exports = (req,res,next)=>{
if(req.params.p==1){
console.log("accessed");
next();
}else {
console.log("access denied");
	
}
};