var express = require('express');
var router = express.Router();
var quizController = require('../controllers/quiz_controller');
var commentControler = require('../controllers/comment_controller');

//Pagina de entrada ( home page)
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz Miriada X', errors: [] });
});

router.param('quizId',quizController.load); //autoload:quizId
router.get('/quizes', quizController.index);

//creditos
router.get('/creditos/autor', quizController.autor);

//mostrar y responder preguntas
router.get('/quizes/:quizId(\\d+)', quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);

//buscar preguntas
router.get('/Busqueda/buscar', quizController.buscar);
router.get('/Busqueda/preguntas', quizController.preguntas);

//crear preguntas
router.get('/quizes/nueva', quizController.nueva);
router.get('/quizes/crear', quizController.crear);

//comentarios
router.get('/quizes/:quizId(\\d+)/comentarios/nuevo', commentControler.nuevo);
router.post('/quizes/:quizId(\\d+)/comentarios', commentControler.crear);
router.get('/quizes/:quizId(\\d+)/comentarios:commentId(\\d+)/publicar', commentControler.publicar);

//editar preguntas
router.get('/quizes/:quizId(\\d+)/editar', quizController.editar);
router.put('/quizes/:quizId(\\d+)', quizController.actualizar);

//borrar preguntas
router.post('/quizes/:quizId(\\d+)', quizController.borrar);

module.exports = router;

