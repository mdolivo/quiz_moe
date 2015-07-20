var path = require('path');
//Postgres = DATABASE_URL = postgres://fxnakxgenzkfod:eETa0d-qNrMG0GucYzR5i5nFWg@ec2-54-235-145-226.compute-1.amazonaws.com:5432/d41h6b325sj764
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

var Quiz = sequelize.import(path.join(__dirname,'quiz'));
exports.Quiz = Quiz; 

sequelize.sync().then(function(){
	Quiz.count().then(function(count){
	if(count===0){
		Quiz.create({pregunta: 'Capital de Italia',
					 respuesta: 'Roma'
					 })
	.then(function(){console.log('Base de datos quiz inicializa')});
	};
});
});
