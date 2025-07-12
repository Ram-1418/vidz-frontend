


import { getData } from './apiServices/userAuth'

function App() {
 
  async function handle() {
     const data= await getData()
     console.log(data);
     console.log(data.message)
     

  }
 


 
  return (
    <>
     <button onClick={handle}></button>
    </>
  )
}

export default App
