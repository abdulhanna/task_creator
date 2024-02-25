'use client'
import React, { useEffect, useState,useRef, useCallback } from 'react'
import authApi from '@/helper/api';
import { taskApi } from '@/helper/api';
import Button from '@/components/atoms/button';
import Header from '@/components/molucules/header';
import { useRouter } from 'next/router';
import TableComp,{TaskTable} from '@/components/molucules/tableComp';
import { CustomSelect, TextField } from '@/components/atoms/field';

const header = [
  {label:'TaskName',name:"title"},
  {label:'Status',name:'status'},
  {label:"Priority",name:"priority"},
  {label:'Assign to', name:'asignedto'},
  {label:'Completion date',name:"completion_date"}
]

const Page = ({access_token,taskList}) => {
  const [list,setList] = useState(taskList.tasks||[])
  const [pageSize,setPageSize] = useState(10)
  const [page,setPage ] = useState(taskList?.currentPage)
  const  [pageCount, setPageCount]= useState(taskList?.totalPages)
  const [filter,setFilter] = useState({status:'',priority:""})
  const [search,setSearch] = useState('')
  const isMounted = useRef(false); 
  const router = useRouter()

  const handleFilter = (e)=>{
      const {name , value}= e.target;
      setFilter((prev)=>({...prev,[name]:value}))
       
      // console.log(value,name);
  }


 
  useEffect(() => {
    // Set isMounted to true after the initial render
    if (!isMounted.current) {
      isMounted.current = true;
    } else {
      // Call the filteredData function whenever the filter state changes
      filteredData(filter.status, filter.priority);
    }
  }, [filter]); // Only re-run the effect if filter state changes

  const filteredData = async (status, priority) => {
    try {
      const { data } = await taskApi.getList(access_token, page,pageSize,status, priority);
      setList(data.tasks)
      setPage(data.currentPage)
      setPageCount(data.totalPages)
    
    } catch (error) {
      console.error('Error fetching filtered data:', error);
    }
  };

  const handleFilterButtonClick = () => {
    filteredData(filter.status, filter.priority);
  };

  const onPageChange  = async(newPage) => {
    console.log(newPage,'ch')
    const { data } = await taskApi.getList(access_token, newPage,pageSize,filter.status, filter.priority);
    setList(data.tasks)
    setPage(data.currentPage)
    setPageCount(data.totalPages)
    // console.log(data)
  }

const handleSearchChange = (e)=>{
    setSearch(e.target.value)
}
   console.log(search)

   const handleSearch = async()=>{
       if(search === ""){
        alert('Please enter a search term!')
       }else{
           
        try{
           const {data} = await taskApi.searchTask(access_token,{title:search})
           console.log(data,'data')
           setList(data)
          //  console.log(res,'search')
        }catch(err){
          console.log(err,'err')
        }
       }
   }

  return (
    <div className='mx-auto py-8 px-4'>
      <Header/>
      <div className='my-4'>
        <Button onClick={()=>router.push('/task/addtask')} variant='teal'>Add new  task</Button>
      </div>
       <div className='grid grid-cols-3 gap-4'>
       <div className=''>
        <TextField className='' label='search by task title' value={search}  onChange={handleSearchChange} />
        <Button className={''} onClick={handleSearch}>Search</Button>
      </div>
      <div>
        <CustomSelect label={'Filter task by status'} name={'status'} value={filter.status} onChange={handleFilter}>
          <option value={""}>choose</option>
          <option value={'Pending'}>Pending</option>
          <option value={'Progress'}>Progress</option>
          <option value={"Completed"}>Completed</option>
        </CustomSelect>
      </div>
      <div>
        <CustomSelect label={'Filter task by priority'} name={'priority'} value={filter.priority} onChange={handleFilter}>
          <option value={""}>choose</option>
          <option value={'High'}>High</option>
          <option value={'Low'}>Low</option>
          <option value={"Medium"}>Medium</option>
        </CustomSelect>
      </div>
       </div>
      <div>
      {
        list.length > 0 ? <>
          
          <TaskTable headers={header}
            body={list}
            onClick={(e)=>console.log(e)}
            href={`/task/single?`}
            currentPage={page}
            totalPage = {pageCount}
            responseData={(data)=> console.log(data)}
            onPageChange={onPageChange}
          />
        </> :<>
          <div>
            <p>No data yet</p>
          </div>
        </>
       }
      </div>
    </div>
  )
}

export const getServerSideProps = async (context) => {
    const { req, res } = context;
    const access_token =
    'cookie' in context.req.headers ? context.req.headers.cookie : null;
   let auth
   let taskList 
   let page = 1
   let pageSize = 10
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
    const {data} = await taskApi.getList(access_token,page,pageSize);
    taskList = data
     console.log(data,'data')
    }catch(err){
      console.log(err,'err')
    }

    
    
    return {
        props:{
         access_token,
         taskList : taskList||{}
        }
    }
  };

export default Page