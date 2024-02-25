'use client'
import React, { useState, useEffect } from 'react';
import { TextField } from '@/components/atoms/field';
import Button from '@/components/atoms/button';
import authApi from '@/helper/api';
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from 'next/router';


export default function Page() {
   
    const [state,setState] = useState({
        username:"",
        password:""
    })
    const router = useRouter()
    const notify = (msg) => toast.success(msg)
    const Error = (msg)=> toast.error(msg)

   const handleChange = (event)=>{
    const name = event.target.name; 
    const value = event.target.value
    setState({...state,[name]:value})
    // console.log(name,value)
   }

const handleSubmit = async()=>{
    if(state.username === "" || state.password === ""){
        alert('please  enter all fields')
        return false
    }
   
    try{
        const res = await authApi.doLogin(state)
         notify('Logged in successfully!');
        if(res.status===200){
            setTimeout(()=>{
                router.push('/task')
            },1500)
        }
        // console.log(res,'res')
    }catch(err){
        Error(err?.response?.data?.error)
        console.log(err.response.data.error,'err')
    }
}
    return (
       <>
             <div className="h-screen w-full py-20">
            <h1 className="text-center text-lg font-bold">Welcome to Task Creator</h1>
            <div className='flex flex-col justify-center items-center space-y-4 mt-8'>
       
                 <TextField className='w-1/3' label="User Name" name='username' value={state.username} onChange={handleChange}/>
                 <TextField className='w-1/3' label="Password" name='password' value={state.password} onChange={handleChange}/>
                 <Button variant='contained' onClick={handleSubmit}>Login</Button>
              
            </div>
            <ToastContainer/>
        </div>
       
       </>
    );
}

export const getServerSideProps = async (context) => {
    const { req, res } = context;
    const auth = await authApi.WhoAmI(context)
    

    if (auth) {
        return {
            redirect: {
                destination: '/task',
                permanent: false,
            },
        };

    }
    return {
        props:{

        }
    }
  };
  