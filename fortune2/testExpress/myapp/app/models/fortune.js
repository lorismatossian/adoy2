var mongoose = require('mongoose');

var fortuneSchema = mongoose.Schema({
	_id:{type: Number },
	content: String,
  user_id: Number,
	score: Number,
	created_at: { type: Date, default: Date.now }
});


var CounterSchema = mongoose.Schema({
    _id: {type: String, required: true},
    seq: { type: Number, default: 0 }
});
var counter = mongoose.model('counter', CounterSchema);

var entitySchema = mongoose.Schema({
    testvalue: {type: String}
});

fortuneSchema.pre('save', function(next) {
    var doc = this;
    counter.findByIdAndUpdate({_id: 'entityId'}, {$inc: { seq: 1} }, {new: true, upsert: true}).then(function(count) {
        console.log("...count: "+JSON.stringify(count));
        doc._id = count.seq;
        next();
    })
    .catch(function(error) {
        console.error("counter error-> : "+error);
        throw error;
    });
});

module.export = mongoose.model('Counter', CounterSchema);
module.export = mongoose.model('Entity', entitySchema);
module.export = mongoose.model('Fortune', fortuneSchema);
