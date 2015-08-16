var models = require('../models/models.js');

//Autoload:id de comentarios
/*exports.load = function(req, res, next, commentId){
    models.Comment.find({
        where: {
            id: Number(commentId)
        }
   }).then(function(comment){
        if(comment){
            req.comment = comment;
            console.log(req.comment.texto);
            next();
        } else {
           next(new Error('No existe commentId=' + commentId));
        }
    }).catch(function(error){next(error)});
};*/

//GET /quizes/:quizId/comentarios/nuevo
exports.nuevo = function(req, res) {
  res.render('comentarios/nuevo.ejs', {quizid: req.params.quizId, errors: []});
};

//POST /quizes/:quizId/comentarios
exports.crear = function(req, res){
	var comment = models.Comment.build({
		texto: req.query.comment.texto, 
		QuizId: req.params.quizId
	});
	
	comment.validate().then(function(err){
		if (err){
		    res.render('comentarios/nuevo.ejs', {comment: comment, quizid: req.params.quizId, errors: err.errors});
		}else{
			comment.save()
			.then( function(){ res.redirect('/quizes/'+req.params.quizId)}) 
		}
	}).catch(function(error){next(error)});    
};

//GET /quizes/:quizId/comments/:commentId/publish
exports.publicar = function(req, res) {
  req.comment.publicado = true;
  req.comment.save( {fields: ["publicado"]})
    .then( function(){ res.redirect('/quizes/'+req.params.quizId);} )
    .catch(function(error){next(error)});

};
/*exports.crear = function(req, res){
	var comment = models.Comment.build({
		texto: req.query.comment.texto, 
		QuizId: req.params.quizId
	});
	
	var errors = comment.validate();
    
	if (errors){
		var i = 0;
        var errores = new Array();                                           
        for (var prop in errors) errores[i++] = {message: errors[prop]};       
            res.render('comentarios/nuevo.ejs', {comment: comment, errors: errores});
	}else{
        comment.save()
        .then( function(){ res.redirect('/quizes/'+req.params.quizId)}) 
      }      
};*/


