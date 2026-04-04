import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "@/apiServices/userAuth";
import ProfileForm from "@/components/ProfileForm";
import AvatarUpload from "@/components/AvatarUpload";
import ChangePassword from "@/components/ChangePassword";



const SettingsPage = () => {

    const {data:user}=useQuery({
        queryKey:["currentuser"],
        queryFn:getCurrentUser
    });
    
    // if(isLoading){
    //   return <Loader></Loader>
    // }
  return (  
    <div className="max-w-3xl mx-auto p-4 space-y-6">
        <h1 className="text-2xl fond-bold">Account Setting</h1>

        <AvatarUpload  avatar={user?.avatar}/>
        <ProfileForm user={user}/>
        <ChangePassword/>
    </div>
  )
}

export default SettingsPage

