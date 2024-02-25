import React, { useEffect, useState } from 'react'
import Header from '@/components/molucules/header'
import { CustomSelect, TextField } from '@/components/atoms/field'
import { useRouter } from 'next/router'
import Button from '@/components/atoms/button'
import authApi, { taskApi } from '@/helper/api'
import { ToastContainer, toast } from "react-toastify";

const initial = {
    title:"",
    description:"",
    due_date:"",
    priority:"",
    status:"",
    asignedto:"",
    completion_date:""
}


const validate = (task) => {
    // console.log()
    const errors = {};
    if (!task.title) {
      errors.title =
        "Task title is required!";
    }
    if (!task.description) {
      errors.description = "Description is required !";
    }
    if (!task.status) {
      errors.status = "Status is required !";
    }
    if (!task.priority) {
      errors.priority = "Priority  is required !";
    }
    if (!task.asignedto) {
      errors.asignedto = "User assign is required !";
    }
    if (!task.due_date) {
      errors.due_date = "due date is required !";
    }
    if (!task.completion_date) {
      errors.completion_date = "completion  is required !";
    }
   
    return errors;
  };

const Addtask = ({access_token,userList}) => {
    const [task,setTask] = useState(initial)
    const [taskErrors, setTaskErrors] = useState({});
    const router = useRouter()
    const notify = (msg) => toast.success(msg)
    const Error = (msg)=> toast.error(msg)
    const [isSubmit, setIsSubmit] = useState(false);
    
    const handleChange = (e)=>{
      const {name , value} = e.target;
       setTask({...task,[name]:value}) 

    }

    useEffect(()=>{
       console.log(task,'task');
    },[task])

    useEffect(() => {
        if (Object.keys(taskErrors).length === 0 && isSubmit) {
            // alert('ddd')
          taskSubmit();
        }
      }, [taskErrors]);

    const handleSubmit =()=>{
        setTaskErrors(validate(task));
        setIsSubmit(true);
    }

    const taskSubmit = async()=>{
        try{
          const res =await taskApi.addTask(access_token,task);
          if(res.status===200){
            notify("Task added Successfully");
            setTimeout(()=>{
              router.push('/task')
            },1000)
          }
          console.log(res,'res')
        }catch(err){
            Error(err?.response?.data?.error)
            console.log(err,'errr')
        }
    }
    // console.log(taskErrors)
  return (
    <div className='mx-auto py-8 px-4'>
        <Header/>
        <div className='inline  cursor-pointer' onClick={()=>router.back()}>Back to List</div>
        <div className='flex justify-center'>
          
           <div className='w-1/2'>
             <div>
             <TextField label='Title' value={task.title} name='title' onChange={handleChange}/>
              {taskErrors.title  && <p className='text-sm text-red-500'>{taskErrors.title}</p>}
             </div>
             <div>
             <TextField label='Description' value={task.description} name='description' onChange={handleChange}/>
             {taskErrors.description  && <p className='text-sm text-red-500'>{taskErrors.description}</p>}
             </div>
             <div>
             <CustomSelect label={'Status'} name={'status'} value={task.status} onChange={handleChange}>
                <option value={""}>choose</option>
                <option value={'Pending'}>Pending</option>
                <option value={'Progress'}>Progress</option>
                <option value={"Completed"}>Completed</option>
               </CustomSelect>
               {taskErrors.status  && <p className='text-sm text-red-500'>{taskErrors.status}</p>}
             </div>
               <div>
               <CustomSelect label={'Priority'} name={'priority'} value={task.priority} onChange={handleChange}>
                <option value={""}>choose</option>
                <option value={'High'}>High</option>
                <option value={'Low'}>Low</option>
                <option value={"Medium"}>Medium</option>
                </CustomSelect>
                {taskErrors.priority  && <p className='text-sm text-red-500'>{taskErrors.priority}</p>}
               </div>
               <div>
               <CustomSelect label={'Assign to'} name={'asignedto'} value={task.asignedto} onChange={handleChange}>
                <option value={""}>choose</option>
                {userList.map((user)=>{
                    return <option key={user._id} value={user.name}>{user.name}</option>
                })}
                </CustomSelect>
                {taskErrors.asignedto && <p className='text-sm text-red-500'>{taskErrors.asignedto}</p>}
               </div>
               <div>
               <TextField type='date' label="Due Date" name='due_date' value={task.due_date} onChange={handleChange}/><br />
               {taskErrors.due_date && <p className='text-sm text-red-500'>{taskErrors.due_date}</p>}
               </div>
               <div>
               <TextField type='date' label="Completion Date" name='completion_date' value={task.completion_date} onChange={handleChange}/><br />
               {taskErrors.completion_date && <p className='text-sm text-red-500'>{taskErrors.completion_date}</p>}
               </div>
                <Button variant='contained' onClick={handleSubmit}>Add task</Button>
           </div>
        </div>
        <ToastContainer/>
    </div>
  )
}

export const getServerSideProps = async (context) => {
    const { req, res } = context;
    const access_token =
    'cookie' in context.req.headers ? context.req.headers.cookie : null;
   let auth
   let userList
    try{
     auth = await authApi.WhoAmI(context)
    if (!auth) {
      return {
          redirect: {
              destination: '/login',
              permanent: false,
          },
      };

  }
     const {data} = await authApi.getUsers(access_token)
     userList = data
    //  console.log(data,'daa')
     
    }catch(err){
      console.log(err,'err')
    }

    
    
    return {
        props:{
         access_token,
        //  taskList : taskList||{},
         userList :userList||[]
        }
    }
  };

export default Addtask