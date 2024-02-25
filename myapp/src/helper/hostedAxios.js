import axios from 'axios'

const local = "http://localhost:5001";
export const hostedAuthAxios = axios.create({
    //    baseURL: `${liveUrl}/auth`,
      baseURL: `${local}`,
// baseURL: 'http://localhost:3000/auth',
//  baseURL:'http://10.0.0.26:4000/auth',

withCredentials: true,
headers: {
'Content-Type': 'application/json',
},
});