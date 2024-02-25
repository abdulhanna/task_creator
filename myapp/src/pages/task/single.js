import React,{useEffect, useState,useRef} from 'react'
import authApi,{taskApi} from '@/helper/api';
import Header from '@/components/molucules/header';
import { useRouter } from 'next/router';
import { TextField } from '@/components/atoms/field';
import { CustomSelect } from '@/components/atoms/field';
import Button from '@/components/atoms/button';
import { DateTime } from "luxon";
import validate from '@/helper/mix';
import { ToastContainer, toast } from "react-toastify";
// import { useState } from 'react';


const single = (access_token) => {
  const [task,setTask] = useState({});
  const [userList,setUserList] = useState([])
  const router = useRouter()
  const isMounted = useRef(false)
  const [taskErrors, setTaskErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const notify = (msg) => toast.success(msg)
  const Error = (msg)=> toast.error(msg)
  useEffect(()=>{
         if(isMounted.current){
            ( async()=>{
              let {data} = await taskApi.getSingle(access_token,router.query.id)
              // console.log(data,'data')
              const isoDueDate = new Date(data.due_date).toISOString();
              const isoCompletionDate = new Date(data.completion_date).toISOString();
              data = { ...data, due_date: DateTime.fromISO(isoDueDate).toFormat('yyyy-MM-dd'),completion_date: DateTime.fromISO(isoCompletionDate).toFormat('yyyy-MM-dd')};
              setTask(data)
              const data1 = await authApi.getUsers(access_token)
              setUserList(data1.data)
              })()
         }

         return ()=>{
          isMounted.current= true;
         }
  },[])
  
  const handleChange = (e)=>{
    const {name , value} = e.target;
     setTask({...task,[name]:value}) 

  }

  const handleSubmit =()=>{
    setTaskErrors(validate(task));
    setIsSubmit(true);
}

const taskSubmit = async()=>{
    try{
      const res =await taskApi.updateTask(access_token,router.query.id,task);
      console.log(res,"res");
      if(res.status===200){
        notify("Task updated Successfully");
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

useEffect(() => {
  if (Object.keys(taskErrors).length === 0 && isSubmit) {
      // alert('ddd')
    taskSubmit();
  }
}, [taskErrors]);

const handleDelete = async()=>{
      try{
        const res = await taskApi.removeTask(access_token,router.query.id)
        if(res.status === 200){
          notify('Task has been deleted')
          setTimeout(()=>{
              router.push('/task')
          },1000)
        }
        console.log(res,'res')
      }catch(err){
        Error(err?.response?.data?.error)
        console.log(err,'err')
      }
} 

  // console.log(userList,task)
  // console.log(DateTime.fromISO(task.due_date).toFormat('yyyy-MM-dd'))
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
                {userList?.map((user)=>{
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
                <div className='space-x-8'>
                <Button variant='contained' onClick={handleSubmit}>Update task</Button>
                <Button onClick={handleDelete}>Delete task</Button>
                </div>
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
     let  {id}=context.query;
     let auth
   
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


      }catch(err){
        console.log(err,'err')
      }
      // console.log(context.query.id)
    return {
        props:{
          access_token,

        }
    }
  };

export default single