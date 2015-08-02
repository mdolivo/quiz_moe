// Definicion del modelo de Quiz con validación

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Quiz',{ 
	pregunta: {
		type: DataTypes.STRING,
		validate: {notEmpty: {msg: "Debe escribir una pregunta"}}
	},
    
	respuesta: {
		type: DataTypes.STRING,
		validate: {notEmpty: {msg: "Debe escribir una respuesta"}}
	},
	 
	 categoria: {
		type: DataTypes.STRING,
	}
	
});
}