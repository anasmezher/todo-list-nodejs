let mongoose = require('mongoose');


// schema
let todolistschema = mongoose.Schema({
	    title  : {
			type : String,
			required : true
		},
         summery  :  {
			type : String,
			required : true
		},
         date  :  {
			type : String,
			required : true
		},
         time  :  {
			type : String,
			required : true
		},
         googleID  :  {
			type : String,
			required : true
		}
});

let todolist = module.exports = mongoose.model('mynewtodolist',todolistschema);
