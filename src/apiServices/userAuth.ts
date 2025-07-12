import { apiV1Url } from "../lib/constsants"

async function getData():Promise<any>{
   const response = await fetch(`${apiV1Url}/health`)
   const data= await response.json()
   return data

}


export{getData}