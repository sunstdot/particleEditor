module.exports = {
	getimg:function(req,res){
		var value = [{imgSrc:"http://localhost:1337/images/flower.png"}]
		res.send({code:'A00000',data:value});	
	}
}