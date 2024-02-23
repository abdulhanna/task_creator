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

const getTaskById = (id)=>{
     return id
}

const taskService = {
    addTask,
    getTaskList ,
    getTaskById
    // login,
}


export default taskService