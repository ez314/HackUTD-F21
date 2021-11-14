import SignInIcon from "../../icon/SignInIcon";

interface UserInfoBarProps {
  user: string;
}

export default function UserInfoBar({ user }: UserInfoBarProps) {
  return (
    <div id="userinfobar" className="flex flex-row items-center m-0 p-0 w-100 h-16 bg-blue-400">
      <SignInIcon className="w-6 h-6 ml-3" />
      <div>{user}</div>
    </div>
  )
}