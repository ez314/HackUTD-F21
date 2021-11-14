import { useState } from "react";
import SignInIcon from "../../icon/SignInIcon";
import Login from "../../Login";
import { UserData, signOut } from "../../../lib/user";
import ProfileIcon from "../../icon/ProfileIcon";
import SignOutIcon from "../../icon/SignOutIcon";

interface UserInfoBarProps {
  user: UserData;
}

export default function UserInfoBar({ user }: UserInfoBarProps) {
  return (
    <div id="userinfobar" className="flex flex-row items-center m-0 p-0 w-full h-16 bg-custom-gray-0">
      {user ? <div className="flex flex-row items-center w-full">
        <ProfileIcon className="w-6 h-6 mx-3 cursor-pointer hover:scale-110 hover:text-custom-blue transition" />
        <div className="text-sm">{`${user.first_name} ${user.last_name}`}</div>
        <SignOutIcon className="w-6 h-6 ml-auto mr-3 cursor-pointer hover:scale-110 hover:text-custom-blue transition" onClick={signOut} />
      </div> :
        <div className="flex flex-row items-center cursor-pointer">
          <SignInIcon className="w-6 h-6 mx-3" />
          <div className="text-sm">Sign In</div>
        </div>
      }
    </div>
  )
}