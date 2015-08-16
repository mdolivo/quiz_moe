var path = require('path');
//Postgres = DATABASE_URL = postgres://prfvspowuvsdzp:4vq-fAZW2nFPYHX0FQU9mheLMp@ec2-50-16-229-91.compute-1.amazonaws.com:5432/d8j2roaluhuneu
//Sqlite DATABASE_URL = sqlite://:@:/
var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var DB_name  = (url[6]||null);
var user     = (url[2]||null);
var pwd      = (url[3]||null);
var protocol = (url[1]||null);
var dialect  = (url[1]||null);
var port     = (url[5]||null);
var host     = (url[4]||null);
var storage  = process.env.DATABASE_STORAGE;

var Sequelize = require('sequelize');

var sequelize = new Sequelize(DB_name, user, pwd, 
  { dialect:  protocol,
    protocol: protocol,
    port:     port,
    host:     host,
    storage:  storage,  // solo SQLite (.env)
    omitNull: true      // solo Postgres
  }      
);

//Importar definicion de la tabla Quiz
var quiz_path = path.join(__dirname,'quiz');
var Quiz = sequelize.import(quiz_path);

//importar definicion de tabla Comment
var comment_path= path.join(__dirname,'comment');
var Comment = sequelize.import(comment_path);

Comment.belongsTo(Quiz);
Quiz.hasMany(Comment);

//exportar tablas
exports.Quiz = Quiz; 
exports.Comment = Comment;

sequelize.sync().then(function(){
	Quiz.count().then(function(count){
	if(count===0){
		Quiz.create({pregunta: 'Capital de Italia',
					 respuesta: 'Roma',
					 categoria: 'Geografia'
					 })
		Quiz.create({pregunta: 'Capital de Venezuela',
					 respuesta: 'Caracas',
					 categoria: 'Geografia'
					 })
	.then(function(){console.log('Base de datos quiz inicializa')});
	};
});
});