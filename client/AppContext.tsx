import React,{useState,useEffect} from "react";

export interface IContext{
  state:{
    jwt:string | boolean,
    user:{
      createdAt:string,
      name:string,
      updatedAt:string,
      username:string,
      friends:[string],
      sentFriendRequests:[string],
      friendRequests:[string],
      _id:string
    } | null
  };
}

export interface Context{
  state:IContext['state'];
  setjwt:(jwt:string)=>void;
  setuser:(user:IContext["state"]["user"])=>void;
}

const AppContext = React.createContext<Context |null>(null);

const defaultData={
  jwt:false,
  user:null,
}

const AppContextProvider = ({children}:{children:React.ReactNode}) => {
  const [state,setState]=useState<IContext['state']>(defaultData);

  useEffect(() => {
    if(!localStorage.getItem('state')){
      console.log("state is empty")
      localStorage.setItem('state',JSON.stringify(state));
    }else{
      setState(JSON.parse(localStorage.getItem('state') as string));
    }
  }, [])


  useEffect(()=>{
    if(state.jwt!==false){
      localStorage.setItem("state",JSON.stringify(state));
    }
  },[state])

  const deepSetjwt = (jwt:string) =>setState(prevState => ({ ...prevState, jwt: jwt }));
  const deepSetuser = (user:IContext["state"]["user"]) =>setState(prevState => ({ ...prevState, user: user }));
  return (
    <AppContext.Provider
      value={{
        state,
        setjwt: deepSetjwt,
        setuser: deepSetuser,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export { AppContext, AppContextProvider };