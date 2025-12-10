import { getCurrentUser } from '@/apiServices/userAuth';
import { useAppDispatch, useAppSelector } from '@/hooks/redux-hooks'
import { login } from '@/store/authSlice';
import { Loader } from 'lucide-react';
import React, { useEffect, useTransition } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

function AuthProvider({ children }: { children: React.ReactNode }) {
  const {status} = useAppSelector((state)=>state.auth);
  const  dispatch = useAppDispatch() 
  const navigate = useNavigate()
  const [isLoading, startLoding] = useTransition();
  const {pathname}=useLocation()

  console.log('location', location)
   
  useEffect(()=>{
   if(status){
    return;
   }
   startLoding(async()=>{
      try {
        const user = await getCurrentUser();
        console.log('user', user)
        if(!status && user){
          console.log('user', user)
          dispatch(login(user))
        }
      } catch (error) {
        console.log('error', error);
      }
   })

  }, [])

  useEffect(()=>{
    if(status && pathname==="/login"){
      
      
      
      navigate("/");
    }
  }, [status]);
  if(isLoading){
    return <Loader className='animate-spin duration-200'></Loader>
  }
  return (
    <>{children}</>
  )
}

export default AuthProvider