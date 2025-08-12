
import React, { useState } from "react"


// import {checkApiHealth,} from"./apiServices/userAuth"
import { getCurrentUser, registerUser, type RegisterType } from "./apiServices/userAuth"
import RegisterForm from "./components/auth/registerForm"
import LoginWithUsername from "./components/loginwithusername";
import { getVideoUploadSignature, uploadVideoToCloudinary } from "./apiServices/videoService";


function App() {
  const [file, setFile] = useState('');

  let userData: RegisterType = {
    username: 'Rameshwar',
    email: 'rameshwarPatil@',
    fullName: 'Rameshwar Patil',
    avatar: 'file',
    password: 'sdsdsdsd'

  }



  const handleChange = (e) => {

    setFile(e.target.files[0])
    
  }
  const handle = () => {
    // checkApiHealth()
    userData.avatar = file
    console.log('userData', userData)
    registerUser(userData)

  }


  const handleViddeoUpload=async(e:React.ChangeEvent<HTMLInputElement>)=>{
     const file=e.target.files?.[0];
     if(!file){
      return Error('file doesnot upload')
     }
     const signeture= await getVideoUploadSignature();
     await uploadVideoToCloudinary(file,signeture)



  }



  return (
    <>
       <button onClick={handle}>clcick me</button>
      <input
        type="file"
        onChange={handleChange}

      ></input>


       <button onClick={getCurrentUser}>get</button>
    <button onClick={getVideoUploadSignature}>getsign</button>

         <RegisterForm/>
         <LoginWithUsername/> 


         <form>
          <input onChange={handleViddeoUpload} type="file" name="file " />
         </form>

      </> 

  
  )
}

export default App
