
// import { useRouter } from "next/router";
// import Link from "next/link";




// const Table = ({
//     headers,
//     data,
//     classes,
//     href = '#',
//     extra,
//     onClick,
//     editItem,
//     responseData,
//   }) => {
//     const lastIndex = headers.length - 1;
  
//     //  console.log(href,'ref')
//     return (
//       <table className={classes.table}>
//         <thead className={classes.thead}>
//           <tr className={classes.tr}>
//             {headers.map((item, index) => (
//               // console.log(item,'dd'),
//               <th key={index}
//                 className={`${classes.th} ${index === 0 && 'rounded-tl-lg'}  ${index === lastIndex && 'rounded-tr-lg'
//                   }`}
//                 scope="col"
//               >
//                 {typeof item.label === 'function' ? item.label() : item.label}
//               </th>
//             ))}
//           </tr>
//         </thead>
  
//         <tbody className={classes.tbody}>
//           {data.map((dataRow, index) => {
//             // console.log(dataRow,'ss') 
//             return (
//               <Link href={`${href}${href !== '#' ? dataRow.href : ''}`} key={index}>
//                 <tr>
//                   {headers.map((item) => {
//                     return (
//                       <td
//                         key={item.name}
//                         className={`${classes.td} ${extra}`}
//                         onClick={() => {
//                           onClick && onClick();
  
//                           responseData && responseData(dataRow);
//                         }}
//                       >
  
//                         {/* {dataRow[item.name] === "action" ?
//                           <div className='flex items-center'>
//                             <EditIcon onClick={(e) => editItem(dataRow.id)} />
//                             <DeleteIcon className={"mx-2"} />
//                           </div> : dataRow[item.name]} */}
//                           {typeof dataRow[item.name] === 'function'
//                       ? dataRow[item.name]()
//                       : dataRow[item.name]}
//                       </td>
//                     );
//                   })}
  
//                 </tr>
//               </Link>
//             );
//           })}
//         </tbody>
//       </table>
//     );
//   };





// export default Table;

import { useRouter } from "next/router";
import Link from "next/link";

const Table = ({
    headers,
    data,
    classes,
    href = '#',
    extra,
    onClick,
    editItem,
    responseData,
  }) => {
    const lastIndex = headers.length - 1;
    const router = useRouter();
  
    return (
      <table className={classes.table}>
        <thead className={classes.thead}>
          <tr className={classes.tr}>
            {headers.map((item, index) => (
              <th key={index}
                className={`${classes.th} ${index === 0 && 'rounded-tl-lg'}  ${index === lastIndex && 'rounded-tr-lg'
                  }`}
                scope="col"
              >
                {typeof item.label === 'function' ? item.label() : item.label}
              </th>
            ))}
          </tr>
        </thead>
  
        <tbody className={classes.tbody}>
          {data.map((dataRow, rowIndex) => (
            <tr key={rowIndex}>
              {headers.map((item, colIndex) => (
                <td
                  key={`${rowIndex}-${colIndex}`}
                  className={`${classes.td} ${extra}`}
                  onClick={() => {
                    onClick && onClick();
                    responseData && responseData(dataRow);
                  }}
                >
                  {item.name === "action" ? (
                    <div className='flex items-center'>
                      <EditIcon onClick={(e) => editItem(dataRow.id)} />
                      <DeleteIcon className={"mx-2"} />
                    </div>
                  ) : (
                    <Link href={`${href}${href !== '#' ? dataRow.href : ''}`}>
                      <p>{typeof dataRow[item.name] === 'function' ? dataRow[item.name]() : dataRow[item.name]}</p>
                    </Link>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
};




export default Table;


  