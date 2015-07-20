var express = require('express');
var router = express.Router();
var quizController = require('../controllers/quiz_controller');
var author= require('../views/creditos/autor');


/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz Miriada X' });
});

router.get('/quizes/show', quizController.show);
router.get('/quizes/answer', quizController.answer);
router.get('/creditos/autor', author.autor);

module.exports = router;



