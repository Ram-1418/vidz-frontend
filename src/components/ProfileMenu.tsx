// src/components/ProfileMenu.tsx

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "@/apiServices/userAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logoutUser } from "@/apiServices/userAuth";
import { useNavigate } from "react-router-dom";

const ProfileMenu = () => {
    const [open, setOpen] = useState(false);

    const { data: user } = useQuery({
        queryKey: ["currentUser"],
        queryFn: getCurrentUser,
    });

    const queryClient = useQueryClient();
    const navigate = useNavigate();

     console.log('user', user)
   
    const logoutMuation = useMutation({
        mutationFn: logoutUser,

        onSuccess: () => {
            queryClient.clear();

            navigate("/login");


        },
        onError: (error) => {
            console.error("Logout error:", error);
        }
    })


    return (
        <div className="relative">
            {/* Avatar */}
            <div
                onClick={() => setOpen(!open)}
                className="w-10 h-10  text-white flex items-center justify-center rounded-full cursor-pointer"
            >
            <img
  src={user?.avatar}
  alt="user avatar"
  className="w-12 h-12 rounded-full object-cover border-2 border-gray-200 shadow-sm hover:scale-105 transition-transform duration-200"
/>
            </div>

            {/* Dropdown */}
            {open && (
                <div className="absolute right-0 mt-2 w-64 bg-gray-900 text-white rounded-lg shadow-lg p-3">
                    <p className="font-semibold">{user?.name}</p>
                    <p className="text-sm text-gray-400">@{user?.username}</p>

                    <div className="mt-3 flex flex-col gap-2">
                      <p>{user.fullName}</p>

                        

                        <button
  onClick={() => {
    setOpen(false);
    navigate("/settings");
  }}
  className="hover:bg-gray-800 p-2 rounded text-left"
>
  Settings
</button>   

                        <button
                            onClick={() => logoutMuation.mutate()}
                            className="hover:bg-gray-800 p-2 rounded text-left text-red-400">
                            Logout
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfileMenu;