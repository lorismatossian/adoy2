var mongoose = require('mongoose');

var fortuneSchema = mongoose.Schema({
	_id:{type: Number },
	content: String,
  user_id: Number,
	score: Number,
	created_at: { type: Date, default: Date.now }
});

/*fortuneSchema.methods.find = function(id) {

};*/
//create the model for fortune and expose it to the app
module.export = mongoose.model('Fortune', fortuneSchema);
