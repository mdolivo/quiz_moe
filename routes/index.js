var express = require('express');
var router = express.Router();
var quizController = require('../controllers/quiz_controller');

//Pagina de entrada ( home page)
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz Miriada X', errors: [] });
});

router.param('quizId',quizController.load); //autoload:quizId
router.get('/creditos/autor', quizController.autor);

router.get('/quizes', quizController.index);
router.get('/quizes/:quizId(\\d+)', quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);
router.get('/Busqueda/buscar', quizController.buscar);
router.get('/Busqueda/preguntas', quizController.preguntas);
router.get('/quizes/nueva', quizController.nueva);
router.get('/quizes/crear', quizController.crear);

router.get('/quizes/:quizId(\\d+)/editar', quizController.editar);
router.get('/quizes/:quizId(\\d+)', quizController.actualizar);

router.post('/quizes/:quizId(\\d+)', quizController.borrar);



module.exports = router;

