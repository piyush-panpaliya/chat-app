import axios from "axios";
const URL="localhost:5000";

const POST=async(body:{},url:string)=>{
  const authk=JSON.parse(localStorage.getItem("state") as string)
  const auth:string=authk?authk.jwt:null 
  const res = await axios.post(
    `http://${URL}/api/${url}`, 
    body,
    {headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${auth}`,
    },
  });
  return res;
}

const GET=async(url:string)=>{
  const auth=JSON.parse(localStorage.getItem("state") as string).jwt
  const res = await axios({
    method:"get",
    url:`http://${URL}/api/${url}`, 
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${auth}`,
    },
  });
  return res;
}
const PUT=async(body:{},url:string)=>{
  const auth=JSON.parse(localStorage.getItem("state") as string).jwt
  const res = await axios.put(
    `http://${URL}/api/${url}`, body?body:null,
    { headers: {
      Authorization: `Bearer ${auth}`,
    },
  });
  return res;
}
const DEL=async(url:string)=>{
  const auth=JSON.parse(localStorage.getItem("state") as string).jwt
  const res = await axios.delete(
    `http://${URL}/api/${url}`,
    { headers: {
      Authorization: `Bearer ${auth}`,
    },
  });
  return res;
}
export {POST,GET,PUT,DEL}