
import React, { useState } from "react"

// import {checkApiHealth,} from"./apiServices/userAuth"
import { registerUser, type RegisterType } from "./apiServices/userAuth"

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



  return (
    <>
      <button onClick={handle}>clcick me</button>
      <input
        type="file"
        onChange={handleChange}

      ></input>
    </>
  )
}

export default App
