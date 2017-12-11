var numeral = require('numeral');
var bcrypt = require('bcrypt-nodejs');
var dateFormat = require('dateformat');
const Fortune = require('../models/fortune');
const User = require('../models/home');



exports.index = function(req, res) {
	var fort = Fortune.find();
	res.render("index", {fort:fort});
};

exports.famous = function(req, res) {
	var fort = Fortune.find();
	res.render("famous");
};

exports.add = function(req, res) {
	render("add");
}

exports.create_fortune = function(req, res)
{
	const fort = new Fortune();
	//fort.title = req.title;
	fort.content = req.body.text;
	/*if (req.user.id != null) {
		fort.user_id = req.user.id;
	}
	else {
		fort.user_id = null;
	}*/
	fort.score = 0;
	fort.save();
	/*if (err) {
		res.render("/error", {error: err});
	}
	else {
		res.redirect("/");
	}*/
	res.redirect('/');
};

exports.delete_fortune = function(req, res) {
	fort = req.fortune;
	fort.remove();
	if (err) {
		res.render("/error", {error: err});
	}
	else {
		res.redirect("/");
	}
};

exports.vote = function(req, res)
{
	fort = req.fortune;
	fort.score = fort.score + req.body;
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



// exports.add = function(req, res) {

// 	res.render('add.ejs', {
// 		error : req.flash("error"),
// 		success: req.flash("success"),
// 		session:req.session,

// 	 });
// 	 next();
// }
