import { createRoot } from 'react-dom/client'
import './index.css'
import React from 'react'

import { 
  Route, 
  RouterProvider, 
  createBrowserRouter, 
  createRoutesFromElements 
} from 'react-router-dom'

import RegisterForm from './components/auth/registerForm.tsx'
import LoginWithUsername from './components/loginwithusername.tsx'
import LogoutButton from './components/LogoutButton.tsx'
import VideoUpload from './components/VideoUpload.tsx'
import GetAllVideo from './components/GetAllVideo.tsx'

// ✅ Create router
const router = createBrowserRouter(
  createRoutesFromElements(
    
    <Route path='/'>
      <Route path="" element={<RegisterForm />} />
      <Route path="login" element={<LoginWithUsername />} />
      <Route path='logout' element={<LogoutButton/>}/>
      <Route path='fileupload' element={<VideoUpload/>}/>
            <Route path='videos' element={<GetAllVideo/>}/>
        
    </Route>
  )
)

// ✅ Render app
createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
