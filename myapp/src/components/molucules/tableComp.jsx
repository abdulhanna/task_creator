import Table from "./table";

const classes = {
    table: "w-full text-sm text-left  ",
    thead:
      "text-sm  uppercase bg-[#F7F7F7] border-b text-gray-500  font-semibold",
    tbody: "bg-white cursor-pointer",
    tr: "text-[#121212] font-body text-sm text-left ",
    th: "px-6 py-4  truncate",
    td: "px-6 py-4 text-sm font-normal  tracking-tighter turncate text-[#121212] border-t border-white",
  };


  const TableComp = ({
    headers,
    body,
    href="#",
    onClick,
    responseData,
    extraclasses,
  }) => {
    return (
      <div className="h-auto py-8">
        <div className="relative overflow-x-auto rounded-lg">
          <Table
            headers={headers}
            data={body}
            classes={classes}
            href={href}
            extra={extraclasses}
            onClick={onClick}
            responseData={responseData}
          />
        </div>
      </div>
    );
  };


export const TaskTable =({
    headers,
    body,
    href,
    onClick,
    currentPage,
    totalPage,
    responseData,
    extraclasses,
    onPageChange
}) =>{
      
    return <div>

         <TableComp
            headers={headers}
            href={href}
            body = {body.map((row)=>{
                return {
                    ...row,
                    href: `id=${row._id}`,
                }
            })}
            onClick={onClick}
            responseData={responseData}
         />
         <Paging currentPage={currentPage} totalPage={totalPage} onPageChange={onPageChange}/>
    </div>
}

const Paging =({currentPage,totalPage,onPageChange})=>{

  const handlePrev = ()=>{
     if(currentPage ===1){
      alert('no change')
     }else{
      onPageChange(currentPage-1)
     }
  }
  const  handleNext =()=>{
     if(currentPage >= totalPage){
      alert('no change')
     }else{
        onPageChange(currentPage+1);
     }
  }
    return <>
        <div className="flex justify-between mt-4 px-8"> 
        <p className="px-4 border-2 border-blue-600 text-white bg-blue-300 rounded cursor-pointer" onClick={handlePrev}> prev</p>
          <div>
            <p> {`page ${currentPage} of ${totalPage}`}</p>
          </div>
        <p className="px-4 border-2 border-blue-600 text-white bg-blue-300 rounded cursor-pointer" onClick={handleNext}>next</p>
         </div>
    </>
}
  export default TableComp