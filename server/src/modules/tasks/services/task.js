import createError from "http-errors-lite"
import StatusCodes, { OK } from "http-status-codes"
import { assert, assertEvery } from "../../../helper/mad-assert";
import { taskModel } from "../model";

const addTask = (data)=>{
    // console.log(data,'data')
    assertEvery(
        [data.title, data.description, data.due_date, data.priority, data.status,data.asignedto,data.completion_date],
        createError(
            StatusCodes.BAD_REQUEST,
            'Invalid Data: [title], [desciption], [due_data], [priority], [status], [asignedto] and [completion_date] fields must exist'
        )
    );
    const newData=taskModel.create({...data});
    return new Promise((resolve,reject)=>newData?resolve(newData):  reject(StatusCodes.INTERNAL_SERVER_ERROR))
    //  return data
}

const getTaskList = async()=>{
     const collect = await taskModel.find({})
     return  collect;
}

const getTaskById = async(id)=>{

    const result = await  taskModel.findOne({ _id: id })
    if(!result) throw createError(StatusCodes.NOT_FOUND,"Not Found")    
    else return result;
    // console.log(id,'idd')
    //  return id
}


const removeTask = async({_id})=>{
       const result = await  taskModel.findByIdAndRemove({_id});
       return result;
}

const searchTasks = async(title)=>{
    try {
        // const { title } = req.query; // Get title query parameter from request
    
        // Validate title parameter
        
    
        // Query tasks collection based on title (using a case-insensitive regex search)
        const tasks = await taskModel.find({ title: { $regex: new RegExp(title, 'i') } });
        return tasks
        // Return search results as response
        // res.json(tasks);
      } catch (error) {
        console.error('Error searching tasks:', error);
        throw createError(StatusCodes.NOT_FOUND,"No task Found") 
        // res.status(500).json({ error: 'Internal server error' });
      }
}

const filterByField = async(query)=>{
    const { status, priority } = query;
    const filter = {};
    if (status) filter.status = status;
    if (priority) filter.priority = priority;
     
    const tasks = await taskModel.find(filter);
    console.log(tasks,'tasks')
    return tasks;
    // const tasks = await taskModel.find(filter);
    // return tasks
}


const countDocs = async(query)=>{
    const { page = 1, limit = 10 } = query;
    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);

       const skip = (pageNumber - 1) * limitNumber;
       const tasks = await taskModel.find({})
       .skip(skip)
       .limit(limitNumber);

       const totalTasks = await taskModel.countDocuments();
        // console.log(totalTasks,'total')
    return {
        tasks,
        totalPages: Math.ceil(totalTasks / limitNumber),
        currentPage: pageNumber
  
    }
}

const taskService = {
    addTask,
    getTaskList ,
    getTaskById,
    removeTask,
    searchTasks,
    filterByField ,
    countDocs
    // login,
}


export default taskService