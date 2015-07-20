var models = require('../models/models.js');

//GET/quizes/show
exports.show= function(req,res){
		res.render('quizes/show',{pregunta:'Capital de Italia'});
};

//GET/quizes/answer
exports.answer= function(req,res){
	if(req.query.respuesta ==='Roma'){
		res.render('quizes/answer',
			{respuesta:'Su respuesta es correcta'});
	}else{
		res.render('quizes/answer',
			{respuesta: 'Su respuesta es incorrecta,verifique mayúsculas y miúsculas'});
	}
};


