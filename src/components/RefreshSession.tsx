import { refreshToken } from '@/apiServices/userAuth'
import { useEffect } from 'react'

const RefreshSession = () => {
  useEffect(()=>{
    refreshToken()
    .then((data)=>{
      console.log(data)
    })
    .catch((error)=>{
console.log('error', error)
    })
  
  })
  return (
    <div>
     
    </div>
  )
}

export default RefreshSession
