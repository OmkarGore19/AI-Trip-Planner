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

  //useEffect(() => {
   // console.log(user);
  //}, [user]);

  const login = useGoogleLogin({
    onSuccess: (tokenInfo) => {
      getUserProfile(tokenInfo);
    },
    onError: (error) => {
      console.error("Google Login Error:", error);
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
        localStorage.setItem("user", JSON.stringify(response.data));
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error fetching user profile:", error);
      });
  };

  return (
    <div className="p-4 shadow-sm flex justify-between items-center font-ubuntu">
      {/* Logo */}
      <a href="/">
        <img
          src="/logo.png"
          alt="Logo"
          className="w-[100px] md:w-[150px] mb-2 md:mb-0" // Logo size adjusts based on screen size
        />
      </a>

      <div className="flex items-center gap-2">
        {user ? (
          <div className="flex gap-3">
            <a href="/create-trip">
              <Button variant="outline" className="w-full mb-1 rounded-3xl">
                + Create Trip
              </Button>
            </a>
            <Popover>
              <PopoverTrigger>
                <img
                  src={user?.picture ? user.picture : "/user.png"}
                  className="h-8 w-8 sm:h-9 sm:w-9 rounded-full cursor-pointer object-cover"
                  alt="User Avatar"
                />
              </PopoverTrigger>
              <PopoverContent className="flex flex-col items-start">
                <a href="/my-trips">
                  <Button variant="link" className="w-full">
                    My Trips
                  </Button>
                </a>
                <hr width="100%" color="gray" />
                <Button
                  variant="link"
                  onClick={() => {
                    googleLogout();
                    localStorage.clear();
                    window.location.reload();
                  }}
                  className="cursor-pointer mb-2"
                >
                  Logout
                </Button>
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
