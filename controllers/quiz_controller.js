var models = require('../models/models.js');

//Autoload
exports.load = function(req, res, next, quizId){
		models.Quiz.find({
					where:{id: Number(quizId)}//,
					//include: [{model:models.comment}]
				}).then(function(quiz){
				if(quiz){
					req.quiz= quiz;
					next();
				}else{
					next(new Error('No existe quizId'+quizId));
				}
			}
		).catch(function(error){next(error);});
};

//GET/credito/autor
exports.autor= function(req,res){
	res.render('creditos/autor');
};

//GET/quizes/
exports.index= function(req,res){
		models.Quiz.findAll().then(function(quizes){
		res.render('Busqueda/lista', {quizes: quizes, errors: []});
	});
};

//GET/quizes/:Id
exports.show= function(req,res){
		models.Quiz.find(req.params.quizId).then(function(quiz) {//estaba find solo
		res.render('quizes/show',{quiz: req.quiz, errors: []});
	})
};


//GET/quizes/:id/answer
exports.answer= function(req,res){
	models.Quiz.find(req.params.quizId).then(function(quiz){
	if(req.query.respuesta === req.quiz.respuesta){
		res.render('quizes/answer',
			{quiz: quiz, respuesta:'Su respuesta es correcta', errors: []});
	}else{
		res.render('quizes/answer',
			{quiz: req.quiz, respuesta: 'Su respuesta es incorrecta,verifique mayúsculas y miúsculas', errors: []});
	}
	})
};

//GET/Busqueda/buscar_p
exports.buscar= function(req,res){
	res.render('Busqueda/buscar_p');
};


//GET/Busqueda/buscar
exports.preguntas= function(req, res){
	var hayBusqueda= false;
	var resultado="incorrecto";
	
	if(req.query.buscar != null){
		console.log("buscar existe" + req.query.buscar);
		var search = req.query.buscar;
		search= "%" + search.replace (" ","%") + "%";
		console.log(search);
		models.Quiz.findAll({where:["pregunta like ?",search]}).then(function(quizes){
			res.render('Busqueda/preguntas', {quizes: quizes});
		})
	}else{
		console.log("No hay coincidencia");
		models.Quiz.findAll().then(function(quizes){
			res.render('Busqueda/preguntas', {quizes: quizes});
		})
	}
};

//GET/quizes/nueva
exports.nueva = function(req, res) {
  var quiz = models.Quiz.build(
    {pregunta: " ", respuesta: " "}
  );
  res.render('quizes/nueva', {quiz: quiz, errors: []});
};

//POST /quizes/crear
exports.crear = function(req, res) {
	var quiz = models.Quiz.build( req.query.quiz );
	var errors = quiz.validate(); 
	if (errors) {
		var i = 0;
        var errores = new Array();                                           
        for (var prop in errors) errores[i++] = {message: errors[prop]};       
            res.render('quizes/nueva', {quiz: quiz, errors: errores});
	}else {
		quiz                                                                 
        .save({fields: ["pregunta", "respuesta", "categoria"]})
        .then(function() {res.redirect('/quizes')});
     } 	
 };
 
 //GET /quizes/:id/editar
exports.editar = function(req, res) {
	var quiz = req.quiz;
	res.render('quizes/editar', {quiz: quiz, errors: []});
};

 //GET /quizes/:id
/*exports.actualizar = function(req, res) {
	req.quiz.pregunta = req.query.quiz.pregunta;
	req.quiz.respuesta = req.query.quiz.respuesta;
	req.quiz.validate().then(function(err){
		if(err){
			res.render('quizes/editar', {quiz: req.quiz, errors: err.errors});
		}else{
			req.quiz
			.save({fields: ["pregunta", "respuesta"]})
			.then(function() {res.redirect('/')});
		}
	}	
	);	
};*/
 exports.actualizar = function(req, res) {
	var quiz = models.Quiz.build( req.query.quiz );
	var errors = quiz.validate(); 
	if (errors) {
		var i = 0;
        var errores = new Array();                                           
        for (var prop in errors) errores[i++] = {message: errors[prop]};       
            res.render('quizes/editar', {quiz: quiz, errors: errores});
	}else {
		quiz                                                                 
        .save({fields: ["pregunta", "respuesta"]})
        .then(function() {res.redirect('/')});
     } 	
 };

 
 
 
 
 //DELETE / quiz/:id
exports.borrar = function(req, res) {
  req.quiz.destroy().then(function() {res.redirect('/quizes')}
  ).catch(function(error){next(error)});
};











