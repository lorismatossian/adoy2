var numeral = require('numeral');
var bcrypt = require('bcrypt-nodejs');
var dateFormat = require('dateformat');
const Fortune = require('../models/fortune');
const User = require('../models/home');



exports.index = function(req, res) {
	var MyModel = connection.model('collection', fortune);
	var forts = Fortune.find();
	var size = Fortune.find().count({});
	res.render("index", {forts:forts, size:size});
};

exports.famous = function(req, res) {
	var fort = Fortune.find();
	res.render("famous");
};

// exports.add = function(req, res) {
// 	res.render("add");
// }

exports.create_fortune = function(req, res)
{
	var fort = new Fortune({ content: 'Test', score: 0});
	fort.save(function (err) {
  if (err) return handleError(err);
});
	//const fort = new Fortune();
	//fort.title = req.body.title;
	//fort.content = req.body.text;
	//fort.content = "Test";
	/*if (req.user.id != null) {
		fort.user_id = req.user.id;
	}
	else {
		fort.user_id = null;
	}*/
  //fort.score = 0;
	//fort.save();
	/*if (err) {
		res.render("/error", {error: err});
	}
	else {
		res.redirect("/");
	}*/
	res.redirect('/');
};

exports.delete_fortune = function(req, res) {
	//fort = req.fortune;
	fort.remove();
	if (err) {
		res.render("/error", {error: err});
	}
	else {
		res.redirect("/");
	}
};

exports.delete = function(req, res) {
	Fortune.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.render('/');
  });
};

exports.vote = function(req, res)
{
	//fort = Fortune.finfByIdAndUpdate()
	fort = req.fortune;
	fort.score = fort.score + req.body.val;
	fort.save();
	if (err) {
		res.render("/error", {error: err});
	}
	else {
		res.redirect("/");
	}
};


exports.voteup = function(req, res)
{
	fort = req.fortune;
	fort.score = fort.score + 1;
	fort.save();
	if (err) {
		res.render("/error", {error: err});
	}
	else {
		res.redirect("/");
	}
};

exports.votedown = function(req, res)
{
	fort = req.fortune;
	fort.score = fort.score - 1;
	fort.save();
	if (err) {
		res.render("/error", {error: err});
	}
	else {
		res.redirect("/");
	}
};


exports.loggedIn = function(req, res, next)
{
	if (req.session.user) { // req.session.passport._id

		next();

	} else {

		res.redirect('/login');

	}

}

exports.home = function(req, res) {


	res.render('home.ejs', {
		error : req.flash("error"),
		success: req.flash("success"),
		session:req.session,

	 });

}


exports.signup = function(req, res) {

	if (req.session.user) {
		res.redirect('/home');

	} else {
		res.render('signup', {
			error : req.flash("error"),
			success: req.flash("success"),
			session:req.session
		});
	}

}


exports.login = function(req, res) {



	if (req.session.user) {

		res.redirect('/home');

	} else {

		res.render('login', {
			error : req.flash("error"),
			success: req.flash("success"),
			session:req.session
		});

	}

}



exports.add = function(req, res) {

	res.render('add.ejs', {
		error : req.flash("error"),
		success: req.flash("success"),
		session:req.session,

	 });
	 next();
}
