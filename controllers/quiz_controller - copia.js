var models = require('../models/models.js');

//get/quiz/:id
exports.show= function(req,res){
	models.Quiz.find(req.params.quizId).then(function(quiz){
	res.render('quizes/show',{quiz:quiz})
	})
};

//GET/quiz/:id/answer
exports.answer= function(req,res){
	models.Quiz.find(req.params.quizId).then(function(quiz){
	if(req.query.respuesta ===quiz.respuesta){
		res.render('quizes/answer',
			{quiz: quiz, respuesta:'Su respuesta es correcta'});
	}else{
		res.render('quizes/answer',
			{quiz: quiz, respuesta: 'Su respuesta es incorrecta'});
	}
	})
};
