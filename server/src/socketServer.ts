import { IUser } from "./models/User";

interface Iusers{
  id:string,
  socketId:string,
  friends:any
}

let users:Iusers[]=[]

const EditData = (data:any, id:string, call:any) => {
  const newData = data.map((item:any) =>
    item.id === id ? { ...item, call } : item
  );
  return newData;
};

const SocketServer = (s:any) => {

  s.on('join', (data:IUser) => {
    users.push({
      id: data._id,
      socketId: s.id,
      friends: data.friends,
    });
    const frnd = users.filter((user) =>
      data.friends.find((i:any) => i._id === user.id)
    );
    s.emit("online-frnds", frnd);

    const clients = users.filter((user) =>
      data.friends.find((item:any) => item._id === user.id)
    );

    if (clients.length > 0) {
      clients.forEach((client) => {
        s
          .to(`${client.socketId}`)
          .emit("online-frnd", data._id);
      });
    }
  });

  s.on('msg-sent',({msg,user}:{msg:any,user:IUser})=>{
    const Ruser = users.find((u) => u.id === msg.recipient);
    
    if(Ruser&& user.friends.some((f:any)=>f._id===Ruser.id)){
      s.to(Ruser.socketId).emit('msg-recieve',{msg:msg.body,user:user._id});
    }
  })
  
  s.on('frnd-req-sent',(user:string)=>{
    const Ruser = users.find((u) => u.id === user);
    Ruser &&  s.to(Ruser.socketId).emit('frnd-req-recieve');
  })


  s.on('disconnect', (user:IUser) => {
    const friends=users.filter((f:any)=>user.friends.find((item:any) => item._id === f.id));
    friends && friends.forEach((f:any)=>s.to(f.socketId).emit('offline',user._id));
  });

}

export default SocketServer;



// {
//   "_id": "62f78bcc3e33227e3a227d21",
//   "name": "piyush",
//   "username": "piyush",
//   "friends": [
//       {
//           "_id": "62f78c083e33227e3a227d24",
//           "name": "pshisop",
//           "username": "pshisop"
//       }
//   ],
//   "friendRequests": [],
//   "sentFriendRequests": [],
//   "createdAt": "2022-08-13T11:32:28.077Z",
//   "updatedAt": "2022-08-13T17:25:22.721Z"
// }
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmY3OGJjYzNlMzMyMjdlM2EyMjdkMjEiLCJpYXQiOjE2NjA0MTE0NzEsImV4cCI6MTY2ODE4NzQ3MX0.zgRyZS31wTaEjgNE8tRUfELzEWpJ4LiTeWDp4CfKULg


// {
//   "_id": "62f78c083e33227e3a227d24",
//   "name": "pshisop",
//   "username": "pshisop",
//   "friends": [],
//   "friendRequests": [],
//   "sentFriendRequests": [],
//   "createdAt": "2022-08-13T11:33:28.131Z",
//   "updatedAt": "2022-08-13T17:08:13.562Z"
// }
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmY3OGMwODNlMzMyMjdlM2EyMjdkMjQiLCJpYXQiOjE2NjA0MTE0NDksImV4cCI6MTY2ODE4NzQ0OX0.hLDbwteQM1Z__gGuTfycwPNSOquO2j3Mo_NI5DFHVY8