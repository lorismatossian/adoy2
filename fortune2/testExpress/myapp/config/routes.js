var home = require('../app/controllers/home');
var fortune = require('../app/models/fortune');
var FortuneController = require('../app/controllers/FortuneController');

//you can include all your controllers

module.exports = function (app, passport) {


    app.get('/', FortuneController.index);
    app.get('/famous', FortuneController.famous);

    app.get('/login', home.login);
    app.get('/signup', home.signup);

    app.get('/add', FortuneController.add);
    app.post('/create', FortuneController.create);

    app.post('/downvote/:id', FortuneController.downvote);
    app.post('/upvote/:id', FortuneController.upvote);



    //app.get('/', home.loggedIn, home.home);//home
    app.get('/home', home.loggedIn, home.home);//home

    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/home', // redirect to the secure profile section
        failureRedirect: '/signup', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
    }));
    // process the login form
    app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/home', // redirect to the secure profile section
        failureRedirect: '/login', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
    }));

    /*app.post('/add', passport.authenticate('local-login', {
        successRedirect: '/home',
        failureRedirect: '/login',
        failureFlash: true


    }));*/
}
