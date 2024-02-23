import { Router } from "express";
import { httpHandler } from '@madhouselabs/http-helpers';
import taskService from "../services/task";
import { isAutenticated } from "../../auth/services/passportConfig";

const router = Router()


router.post('/add',isAutenticated,httpHandler(async(req,res)=>{
    //   console.log(req.body)
    const collect = await taskService.addTask(req.body)
      res.send(collect)
}))


router.get('/list' ,isAutenticated,httpHandler(async (req, res) => {
    const collection = await taskService.getTaskList(req.body, req.params)
    res.send(collection)
}))

router.get('/taskId/:id', httpHandler( async (req, res) => {
    if (!req.params.id){
        return res.status(400).end('Missing parameter id')
    }
    let item = await taskService.getTaskById(req.params.id);
    if(!item) {
        return res.status(404).end(`Item with id "${req.params.id}" not found`) }
        return item
}))
export default router
