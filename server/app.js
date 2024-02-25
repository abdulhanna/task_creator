import cookieParser from "cookie-parser";
import express from "express"
import cors from 'cors';
import './src/helper/init'
import bodyParser from 'body-parser';
import session from "express-session";
import passport from "passport";
import { errorHandler,notFoundHandler } from "./src/helper/express-middleware";
import authModule from "./src/modules/auth";
import taskModule from "./src/modules/tasks";
const modules = [
    authModule,
    taskModule
    // activityModule,
    // skillModule,
    // goalModule
]

export const createApp = () => {
    const app = express();


    app.use(bodyParser.json({ limit: "100mb" }));
    app.use(bodyParser.urlencoded({ limit: "100mb", extended: true, parameterLimit: 100000000 }));
    app.use(cookieParser());

    // initializePassport(passport)

    app.use(session({
        secret: 'secret',
        resave: false,
        saveUninitialized: false,
        cookie: {
            // domain: 'goal2.dev.client.kloudlite.io',
            // domain:"amazing7studios.com",
            // httpOnly: true,
            secure: false,
            // sameSite: "strict",
            path: "/",
            // Session expires after 60 min of inactivity.
            maxAge: 30 * 24 * 60 * 60 * 1000
        }

    }))

    app.use(passport.initialize());
    app.use(passport.session());

    app.set('trust proxy', true);


    app.use(
        cors({
            origin: [
                "http://localhost:3000",

            ],
            credentials: true,
        })
    );



    // app.use(session({
    //     store: new RedisStore({ client: redisClient }),
    //     name: 'sessionId',
    //     secret: 'secret$%^134',
    //     resave: false,
    //     saveUninitialized: false,
    //     cookie: {
    //         secure: false, // if true only transmit cookie over https
    //         httpOnly: true, // if true prevent client side JS from reading the cookie 
    //         maxAge: 1000 * 60 * 10 // session max age in miliseconds
    //     }
    // }))

    return app;
};


export const finishApp = (app) => {
    app.use(notFoundHandler);
    app.use(errorHandler);
};

export const useModules = (app) => {
    console.log('******during*****');

    // console.log(modules);
    modules.map((module) => module.init(app));
};