import React from "react";
import { Button } from "../ui/button";

function Header() {
  return (
    <div className="p-4 shadow-sm flex justify-between items-center px-10">
      <img src="/logo.png" alt="Logo" width={150}/>
      <div>
        <Button>Sign In</Button>
      </div>
    </div>
  );
}

export default Header;
