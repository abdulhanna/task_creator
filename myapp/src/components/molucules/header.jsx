import React from 'react'
import Button from '../atoms/button'
import authApi from '@/helper/api'
import { useRouter } from 'next/router'
const Header = () => {
   const router = useRouter()
    const handleSubmit = async()=>{
       
         try{
             const res = await authApi.doLogout()
            //  console.log(res)
             if(res.status === 200){
                   router.push('/')
             }
         }catch(err){
            console.log(err,'err')
         }
    }
  return (
    <>
         <div className='flex justify-between items-center'>
    <p></p>
    <h2 className='text-2xl font-bold'>Welcome to task creator</h2>
    <Button variant='danger' onClick={handleSubmit}>Logout</Button>
    </div>
    </>
  )
}

export default Header