var models = require('../models/models.js');

//Autoload
exports.load = function(req, res, next, quizId){
		models.Quiz.find(quizId).then(
			function(quiz){
				if(quiz){
					req.quiz= quiz;
					next();
				}else{
					next(new Error('No existe quizId'+quizId));
				}
			}
		).catch(function(error){next(error);});
};

//GET/quizes/
exports.index= function(req,res){
		models.Quiz.findAll().then(function(quizes){
		res.render('quizes/index.ejs', {quizes: quizes});
	})
};

//GET/quizes/:Id
exports.show= function(req,res){
		models.Quiz.find(req.params.quizId).then(function(quiz) {
		res.render('quizes/show',{quiz: req.quiz});
	})
};

//GET/quizes/:id/answer
exports.answer= function(req,res){
	models.Quiz.find(req.params.quizId).then(function(quiz){
	if(req.query.respuesta === req.quiz.respuesta){
		res.render('quizes/answer',
			{quiz: quiz, respuesta:'Su respuesta es correcta'});
	}else{
		res.render('quizes/answer',
			{quiz: req.quiz, respuesta: 'Su respuesta es incorrecta,verifique mayúsculas y miúsculas'});
	}
	})
};

//GET/busqueda/buscar_p
exports.buscar= function(req,res){
	res.render('busqueda/buscar_p');
};


//GET/busqueda/buscar
exports.preguntas= function(req,res){
		var buscar= req.params.buscar;
		if(buscar){
			var texto=(req.params.buscar || '').replace(" ", "%");
			models.Quiz.findAll({where:["pregunta like ?", '%'+texto+'%']/*,order:'pregunta ASC'*/}).then(function(quizes){
			res.render('Busqueda/preguntas', {quizes: quizes});
			}).catch(function(error) { next(error);});
		}else {
			models.Quiz.findAll().then(function(quizes){
			res.render('Busqueda/preguntas', {quizes: quizes});
			}).catch(function(error) { next(error);});
		}
};






