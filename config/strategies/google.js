'use strict';

/**
 * Module dependencies.
 */
var passport = require('passport'),
    url = require('url'),
    GoogleStrategy = require('passport-google-oauth').OAuth2Strategy,
    config = require('../config'),
    auth = require('../../app/controllers/auth');

module.exports = function () {
    // Use google strategy
    passport.use(new GoogleStrategy({
            clientID: config.google.clientID,
            clientSecret: config.google.clientSecret,
            callbackURL: config.google.callbackURL,
            passReqToCallback: true
        },
        function (req, accessToken, refreshToken, profile, done) {
            // Set the provider data and include tokens
            var providerData = profile._json;

            if (providerData.hd !== 'xebia.fr' && providerData.hd !== 'wescale.fr') {
                return done(null, false, {message: 'Not from Xebia or WeScale!'});
            } else {
                providerData.accessToken = accessToken;
                providerData.refreshToken = refreshToken;

                // Create the user OAuth profile
                var providerUserProfile = {
                    firstName: profile.name.givenName,
                    lastName: profile.name.familyName,
                    displayName: profile.displayName,
                    email: profile.emails[0].value,
                    username: profile.username,
                    provider: 'google',
                    providerIdentifierField: 'id',
                    providerData: providerData
                };

                // Save the user OAuth profile
                auth.saveOAuthUserProfile(req, providerUserProfile, done);
            }
        }
    ));
};