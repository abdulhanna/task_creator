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

router.get('/taskId/:id', isAutenticated,httpHandler( async (req, res) => {
    if (!req.params.id){
        return res.status(400).end('Missing parameter id')
    }
    // console.log(req.params.id)
    let item = await taskService.getTaskById(req.params.id);
    if(!item) {
        return res.status(404).end(`Item with id "${req.params.id}" not found`) }

        // console.log(item,'item')
    res.status(200).send(item)
}))

router.delete('/delete/:id', isAutenticated, httpHandler(async (req, res) => {
       const  deleted =  await taskService.removeTask({_id:req.params.id})
       if (!deleted) {
           return res.status(404).end(`No such task exists with id ${req.params.id}`)
       }
       res.status(200).send(`task has been deleted`)
}))

// Define route to search tasks by title
router.post('/search', httpHandler(async (req, res) => {
  console.log(req.body,'body')
   const title = req.body.title
    if (!title) {
        return res.status(400).json({ error: 'Title parameter is required for search' });
      }
    
      const results = await taskService.searchTasks(title);
       
      res.send(results);
      
    //   const collect = await  taskService.searchTasks(req.query.title)
    //   res.json(collect)
  }));

  router.get('/filter', httpHandler(async(req,res)=>{

    const { status, priority } = req.query; // Get status and priority query parameters from request

    // Validate status and priority parameters
    if (!status && !priority) {
      return res.status(400).json({ error: 'At least one of status or priority parameters is required' });
    }
    

    const filteredItems= await taskService.filterByField(req.query)
       res.send(filteredItems)

    }))


    router.put('/update/:id',httpHandler(async(req,res)=>{

      const collect = await  taskService.updateTask({_id:req.params.id, data:req.body})
      if(!collect){
          return res.status(404).send('No task with such id found')
      }
      res.send(collect)
        //  res.send('hello')
    }))

    router.get('/pagination',httpHandler(async(req,res)=>{
        const { page = 1, limit = 10 ,status="",priority=""} = req.query; // Get page and limit query parameters from request
        const query = {page,limit,status,priority}
         // Convert page and limit to number
       const collect = await taskService.countDocs(query)
       res.send(collect)

    }))
  
export default router
