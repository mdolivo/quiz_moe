var models = require('../models/models.js');

//GET/quizes/show
exports.show= function(req,res){
	models.Quiz.findAll().then(function(quiz){
		res.render('quizes/show',{pregunta:quiz[0].pregunta})
	})
};

//GET/quizes/answer
exports.answer= function(req,res){
	models.Quiz.findAll().then(function(quiz){
		if(req.query.respuesta === quiz[0].respuesta){
			res.render('quizes/answer',
			{respuesta:'Su respuesta es correcta'});
		}else{
			res.render('quizes/answer',
			{respuesta: 'Su respuesta es incorrecta,verifique mayúsculas y miúsculas'});
		}
	})
};


