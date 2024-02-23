import { Router } from "express";
import { httpHandler } from '@madhouselabs/http-helpers';
import { isAutenticated } from "../services/passportConfig";
import passport from "passport";
import authService from "../services/auth";

const router = Router()

router.post('/register', httpHandler(async (req, res) => {
    const collection = await authService.doRegister(req.body, req.params)
    res.send(collection)
}))


router.post('/login/:serviceType', passport.authenticate('local'), httpHandler(async (req, res) => {
    // console.log(req,'req')
    // const result = await sessionService.saveSessionToDB({ user: req.email })
    // console.log(req.sessionID, 'logiin')
    // const collection = await authService.login(req, req.params)
    res.send(req.user)
}))


router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get(
    '/who-am-i',
    isAutenticated,
    httpHandler(async (req, res) => {
        res.send({ user: req.user, session: req.session });
    })
);

export default router;