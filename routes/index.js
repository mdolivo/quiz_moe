var express = require('express');
var router = express.Router();
var quizController = require('../controllers/quiz_controller');
var author= require('../views/creditos/autor');

//Pagina de entrada ( home page)
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz Miriada X' });
});

router.param('quizId',quizController.load); //autoload:quizId

router.get('/quizes', quizController.index);
router.get('/quizes/:quizId(\\d+)', quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);
router.get('/creditos/autor', author.autor);
router.get('/Busqueda/buscar', quizController.buscar);
router.get('/Busqueda/preguntas', quizController.preguntas);


module.exports = router;



