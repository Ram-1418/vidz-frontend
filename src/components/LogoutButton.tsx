
import { logoutUser } from '@/apiServices/userAuth'
import { Button } from './ui/button'

const LogoutButton = () => {
  const handleLogout = async () => {
    try {
      await logoutUser()   // ✅ Calls your API service
      window.location.href = "/login" // redirect after logout
    } catch (error) {
      console.log("Error during logout:", error)
    }
  }

  return (
    <div>
      <Button onClick={handleLogout}>
        Logout
      </Button>
    </div>
  )
}

export default LogoutButton
