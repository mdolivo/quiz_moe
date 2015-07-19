//GET/quiz/question
exports.question= function(req,res){
	res.render('quizes/question',{pregunta: '¿Cual es la capital de Italia?'});
};

//GET/quiz/answer
exports.answer= function(req,res){
	if(req.query.respuesta ==='Roma'){
		res.render('quizes/answer',{respuesta: 'Su respuesta es correcta'});
	}else{
		res.render('quizes/answer',{respuesta: 'Su respuesta es incorrecta'});
	}
};
