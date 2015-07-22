var models = require('../models/models.js');

//GET/quizes/
exports.index= function(req,res){
		models.Quiz.findAll().then(function(quizes){
		res.render('quizes/index.ejs', {quizes: quizes});
	})
};

//GET/quizes/:Id
exports.show= function(req,res){
		models.Quiz.find(req.params.quizId).then(function(quiz) {
		res.render('quizes/show',{quiz: quiz});
	})
};

//GET/quizes/:id/answer
exports.answer= function(req,res){
	models.Quiz.find(req.params.quizId).then(function(quiz){
	if(req.query.respuesta ===quiz.respuesta){
		res.render('quizes/answer',
			{quiz: quiz, respuesta:'Su respuesta es correcta'});
	}else{
		res.render('quizes/answer',
			{quiz: quiz, respuesta: 'Su respuesta es incorrecta,verifique mayúsculas y miúsculas'});
	}
	})
};

