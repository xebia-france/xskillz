'use strict';

/**
 * Module dependencies.
 */
var passport = require('passport');

module.exports = function (app) {
    // User Routes
    var users = require('../../app/controllers/users'),
        user = require('../../app/controllers/user'),
        auth = require('../../app/controllers/auth');


    app.route('/users/me/skillz').get(auth.requiresLogin, users.mySkillz);

    app.route('/users/me/availableSkillz').get(auth.requiresLogin, users.availableSkillzForMe);

    app.route('/users').get(auth.requiresLogin, users.allXebians);

    app.route('/users/me/skillz/disassociate')
        .post(auth.requiresLogin, users.disassociate);

    app.route('/users/me/skillz/:id/level')
        .put(auth.requiresLogin, users.updateLevel);

    app.route('/users/me/skillz/:id/like')
        .put(auth.requiresLogin, users.updateLike);

    app.route('/users/me/skillz')
        .put(auth.requiresLogin, users.associate);

    app.route('/users/skillz/:skill')
        .get(auth.requiresLogin, users.findXebiansBySkillz);

    app.route('/user/:email').get(auth.requiresLogin, user.profile);

    app.route('/user/:email').delete(auth.requiresLogin, user.remove);

    app.route('/user/skillz/:email').get(auth.requiresLogin, user.skillz);

    app.route('/user/diploma').post(auth.requiresLogin, users.associateDiploma);

    app.route('/user/manager').post(auth.requiresLogin, users.associateManager);

    app.route('/users/notifications').get(users.notifications);

    app.route('/managers').get(users.managers);

};
