
import React , {createContext, useState , useContext} from "react"
import StudentApi from "../service/api/student/UsersApi";
import { STUDENT_DASHBOARD_ROUTE } from "../router";
import { useNavigate } from "react-router-dom";

    export const UserStateContext = createContext({
    user:{},
    Authenticated : false,
    setAuthenticated : ()=>{},
    setUser: () => {},
    Login: (email, password) => {},
    logout: () => {},
    setToken : () => {}
});

//  return  StudentApi.
export default function UserContext({children}){
    
    const [user , setUser] = useState({});
    const [Authenticated , _setAuthenticated] = useState(window.localStorage.getItem('AUTHENTICATED') === 'true');
     
    const Login = async (email, password) => {
    await   StudentApi.getCsrfToken();
    return  StudentApi.login(email, password);
};

    const logout = () =>{
        setUser({});
        setAuthenticated(false);
    }


  const setToken = (token) => {
    window.localStorage.setItem('token', token)
  }


    const setAuthenticated = (isAuthenticated) => {
    _setAuthenticated(isAuthenticated)
    window.localStorage.setItem('AUTHENTICATED', isAuthenticated)
  }

    return(
    <>
    <UserStateContext.Provider 
     value = {{user , Authenticated , setAuthenticated,  Login ,  setUser , logout , setToken}}
     >
        {children}
    </UserStateContext.Provider>
    </>
    )
}
export const useUserContext = () => useContext(UserStateContext); 
