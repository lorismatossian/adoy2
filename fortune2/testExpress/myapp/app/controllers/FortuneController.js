var mongoose = require("mongoose");
var Fortune = mongoose.model("Fortune");
var Entity = mongoose.model("Entity");
var Counter = mongoose.model("Counter");
var fortuneController = {};

fortuneController.index = function(req, res) {
  create_counter(req);
  Fortune.find({}).exec(function (err, fortunes) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      res.render("index", {fortunes:fortunes});
    }
  });
};

create_counter = function(req)
{
  Counter.findById({_id: 'entityId'}).exec(function(err, Counter) {
    if (err) {
      var count = new Counter();
      count._id = 'entityId';
      count.save();
    }
  })
};


fortuneController.famous = function(req, res) {
  Fortune.find({}).sort({ score: -1 }).limit(30).exec(function (err, fortunes) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      res.render("famous", {fortunes:fortunes});
    }
  });
};

fortuneController.add = function(req, res) {
  res.render("add");
}


fortuneController.upvote = function(req, res) {
  Fortune.findByIdAndUpdate({_id: req.params.id}, {$inc: { score: 1} }, {new: true, upsert: true}).then(function (fortune) {
    res.redirect('/');
  })
  .catch(function(error) {
      console.error("counter error-> : "+error);
      throw error;
  });
}

fortuneController.downvote = function(req, res) {
  Fortune.findByIdAndUpdate({_id: req.params.id}, {$inc: { score: -1} }, {new: true, upsert: true}).then(function (fortune) {
    res.redirect('/');
  })
  .catch(function(error) {
      console.error("counter error-> : "+error);
      throw error;
  });
};

fortuneController.create = function(req, res) {
  var fortune = new Fortune(req.body);
  //fortune.content = req.body.content;
  fortune.score = 0;
  fortune.save(function(err) {
    if(err) {
      res.render("add");
    } else {
      res.redirect("/");
    }
  });
};

module.exports = fortuneController;
