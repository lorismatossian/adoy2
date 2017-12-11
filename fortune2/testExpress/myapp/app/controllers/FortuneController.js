var mongoose = require("mongoose");
var Fortune = mongoose.model("Fortune");
var fortuneController = {};

fortuneController.index = function(req, res) {
  Fortune.find({}).exec(function (err, fortunes) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      res.render("index", {fortunes:fortunes});
    }
  });
};

fortuneController.famous = function(req, res) {
  Fortune.find({}).exec(function (err, fortunes) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      res.render("index", {fortunes:fortunes});
    }
  });
};

fortuneController.add = function(req, res) {
  res.render("add");
}

fortuneController.create = function(req, res) {
  var fortune = new Fortune(req.body);
  //fortune.content = req.body.content;
  //fortune.score = 0;
  fortune.save(function(err) {
    if(err) {
      res.render("add");
    } else {
      res.redirect("/");
    }
  });
};

module.exports = fortuneController;
