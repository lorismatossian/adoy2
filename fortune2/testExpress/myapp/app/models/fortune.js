
//app/models/user.js
//load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

//define the schema for our user model
var fortuneSchema = mongoose.Schema({
	_id:{ type: Number, default: 1 },
	//title: String,
	content: String,
	user_id: Number,
	score: Number,
	created_date: Date,
	updated_date: Date
});


//methods ======================
fortuneSchema.methods.findAll = function() {
 return
};

/*fortuneSchema.methods.find = function(id) {

};*/
//create the model for fortune and expose it to the app
let Fortune = mongoose.model('ex_fortunes', fortuneSchema);
module.exports = Fortune;
