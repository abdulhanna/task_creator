import { Router } from "express";
import taskRouter from './router/task'


const router = Router()

router.use('/task', taskRouter);


const taskModule = {
    init: (app) => {
        app.use(router);
        console.log("Task module Loaded")
    },
};


export default taskModule