import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import axios from "axios";

function Header() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [openDialog, setOpenDialog] = useState(false); // Manage dialog state

  useEffect(() => {
    console.log(user);
  }, [user]);

  const login = useGoogleLogin({
    onSuccess: (tokenInfo) => {
      //console.log("Google Login Success:", tokenInfo);
      getUserProfile(tokenInfo);
    },
    onError: (error) => {
      //console.log("Google Login Error:", error);
    },
  });

  const getUserProfile = (tokenInfo) => {
    const accessToken = tokenInfo?.access_token; // Get the access token from the login response
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${accessToken}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`, // Correct header for Google API
            Accept: "application/json",
          },
        }
      )
      .then((response) => {
        //console.log("User Profile Data:", response.data); // Log user profile data
        localStorage.setItem("user", JSON.stringify(response.data));
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error fetching user profile:", error);
      });
  };

  return (
    <div className="p-4 shadow-sm flex justify-between items-center sm:px-4 md:px-10 font-ubuntu">
      {/* Logo */}
      <a href="/">
        <img
          src="/logo.png"
          alt="Logo"
          className="w-[100px] md:w-[150px]" // Logo size adjusts based on screen size
        />
      </a>
      <div>
        {user ? (
          <div className="flex items-center gap-3">
            <a href="/create-trip">
              <Button
                variant="outline"
                className="rounded-full text-sm sm:text-base"
              >
                + Create Trip
                {/* {user?.email} */}
              </Button>
            </a>
            <a href="/my-trips">
              <Button
                variant="outline"
                className="rounded-full text-sm sm:text-base"
              >
                My Trips
              </Button>
            </a>
            <Popover>
              <PopoverTrigger>
                <img
                  src={user?.picture ? user.picture : '/user.png'}
                  className="h-[30px] w-[30px] sm:h-[35px] sm:w-[35px] rounded-full cursor-pointer"
                  alt="User Avatar"
                />
              </PopoverTrigger>
              <PopoverContent>
                <h2
                  onClick={() => {
                    googleLogout();
                    localStorage.clear();
                    window.location.reload();
                  }}
                  className="cursor-pointer"
                >
                  Logout
                </h2>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <Button
            className="text-sm sm:text-base"
            onClick={() => setOpenDialog(true)}
          >
            Sign In
          </Button>
        )}
      </div>

      {/* Dialog for Sign In */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img
                src="/logo.png"
                alt="Logo"
                className="w-[100px] md:w-[150px]"
              />
              <h2 className="font-bold text-lg mt-7 text-black">
                Sign In with Google
              </h2>
              <p>
                To proceed with the application, you need to sign in with Google
                Authentication securely.
              </p>
              <Button className="w-full mt-5 flex gap-3" onClick={login}>
                <img src="/google.png" alt="Google icon" width={20} />
                Sign In with Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Header;
