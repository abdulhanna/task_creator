import { hostedAuthAxios } from "./hostedAxios";


const authApi = {};
export const taskApi = {};

authApi.doLogin = async (data) => hostedAuthAxios.post("/auth/login/web", data);

authApi.getUsers = (access_token)=> hostedAuthAxios.get( "/auth/userlist",{
  headers: { Cookie: access_token }
});

authApi.WhoAmI = async (appCtx) => {
  let user = null;
    const cookie =
        'cookie' in appCtx.req.headers ? appCtx.req.headers.cookie : null;

    // console.log(user)
    try {
        // console.log(cookie, 'cookie')
        if (appCtx && appCtx.req) {
            user = await hostedAuthAxios.get('/auth/who-am-i', {
                headers: {
                    cookie: cookie
                }

            });
            // console.log(user.data, 'user.data')
        } else {
            return {}
        }
    } catch (err) {
        console.log('error:', err);
    }
    // console.log(user, 'user')
    return user?.data && user.data.user ? user : false;
  };


  authApi.doLogout = async ()=> hostedAuthAxios.post('/auth/logout')




  taskApi.getList = async (access_token, page = 1, pageSize = 10,status="",priority="") => {

    let url = '/task/pagination';
    let queryParams = [];
  
    if (page) queryParams.push(`page=${page}`);
    if (pageSize) queryParams.push(`limit=${pageSize}`);
    if(status) queryParams.push(`status=${status}`)
    if(priority) queryParams.push(`priority=${priority}`)
  
    if (queryParams.length > 0) {
      url += '?' + queryParams.join('&');
    }
  
    return hostedAuthAxios.get(url, {
      headers: { Cookie: access_token }
    });


  }

  taskApi.getFilterList = async (access_token, status = "", priority = "") => {

    let url = '/task/filter';
    let queryParams = [];
  
    if (status) queryParams.push(`status=${status}`);
    if (priority) queryParams.push(`priority=${priority}`);
  
    if (queryParams.length > 0) {
      url += '?' + queryParams.join('&');
    }
  
    return hostedAuthAxios.get(url, {
      headers: { Cookie: access_token }
    });


  }

  taskApi.addTask  = async(access_token,data) => {
        return hostedAuthAxios.post('/task/add',data,{
          headers: { Cookie: access_token }
        })
  };

  taskApi.getSingle = async(access_token,id)=> hostedAuthAxios.get(`task/taskId/${id}`, {headers:{Cookie : access_token}});

  taskApi.updateTask = async(access_token,id,data)=> hostedAuthAxios.put(`task/update/${id}`,data, {headers:{Cookie : access_token}});
  
  taskApi.removeTask = async(access_token,id)=> hostedAuthAxios.delete(`task/delete/${id}`, {headers:{Cookie : access_token}});

  taskApi.searchTask = async(access_token,data) => hostedAuthAxios.post('/task/search',data,{
    headers:{Cookie : access_token}
  });
  // task/update/65dad8c397f27783badf3843
  export  default authApi;