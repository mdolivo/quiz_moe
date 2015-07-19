var express = require('express');
var router = express.Router();

//GET/creditos/autor
exports.autor= function(req,res){
	res.render('creditos/autor');
};
