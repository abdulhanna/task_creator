const LocalStrategy = require('passport-local').Strategy
const GoogleStrategy = require("passport-google-oauth20").Strategy;
import { userModel } from '../model'
import bycrpt, { compareSync } from "bcryptjs"
import createError from "http-errors-lite"
import StatusCodes from "http-status-codes"
import passport from 'passport';


const GOOGLE_CLIENT_ID =
    "515903935995-g86h6buohoqp6be02pdvvnfukl7ru6es.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";
const GOOGLE_CLIENT_ID1 = "GOOGLE_CLIENTID"
const GOOGLE_CLIENT_SECRET1 = "GOOGLE_CLIENT_SECRET"



passport.use(new LocalStrategy(async (username,password, done) => {
    // console.log(username, password,'sd')

    // const userName = username.body.username;
    // const password = username.body.password;




    try {
        const user = await userModel.findOne({ username: username });

        if (!user) return done(createError(StatusCodes.UNAUTHORIZED, "Please register first"), false)


        const validpassword = bycrpt.compareSync(password, user.password)
        if (!validpassword) return done(createError(StatusCodes.UNAUTHORIZED, "you are not authorized"), false)

       
        return done(null, user)
    } catch (error) {
        console.log(error)
    }

}))

passport.use(
    new GoogleStrategy(
        {
            clientID: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_CLIENT_SECRET,
            callbackURL: "/auth/google/callback",
        },
        (async (accessToken, refreshToken, profile, done) => {
            // console.log(profile.emails[0].value)
            try {
                const user = await userModel.findOne({ username: profile.emails[0].value })
                if (!user) {
                    console.log('create new user')
                    // const newUser = new userModel()

                    // newUser.username = username = profile.emails[0].value

                }
                done(null, profile)
            } catch (err) {
                console.log(err)
            }
        })

    )
);



passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});



export const isAutenticated = (req, res, next) => {
    if (req.user) {
        return next()

    };
    console.log(req.user)

    res.send(createError(StatusCodes.UNAUTHORIZED, "session expired"))

}