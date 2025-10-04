import { AxiosError } from "axios";

function hadleError(error:unknown){
    let message=""
   if (error instanceof AxiosError) {
        message=error.message
   }else if(error instanceof Error){
    message=error.message
   }

  return message
}



export default  hadleError