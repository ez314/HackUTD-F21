import { useState } from "react";
import { UserData } from "../../lib/user";
import LoadIcon from "../icon/LoadIcon";
import styles from "./style.module.css";
interface LoginProps {
  setUser
}

function validatePhone() {
  const regex = /^\d{10}$/
  const e = document.getElementById(styles.loginphone) as HTMLInputElement;
  const phone = e.value;
  let validated = false;
  let color = '#ff0000';
  if (phone.match(regex)) {
    color = '#00ff00';
    validated = true;
  }
  if (phone === undefined || phone === '') color = '#ffffff';
  e.style.setProperty('--color', color);
  return validated;
}
function validatePassword() {
  const e = document.getElementById(styles.loginpassword) as HTMLInputElement;
  const password = e.value;
  let validated = false;
  let color = '#ff0000';
  if (password.length >= 8) {
    color = '#00ff00';
    validated = true;
  }
  if (password === undefined || password === '') color = '#ffffff';
  e.style.setProperty('--color', color);
  return validated;
}

export default function Login({ setUser }: LoginProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  return (
    <div id="login" className="absolute flex items-center justify-center w-full h-full bg-cool-0 z-10">
      <div id="loginactual" className="relative flex flex-col items-center w-1/3 h-3/5 p-3 bg-black rounded-xl text-white">
        <div className="text-3xl font-black mb-7">LOGIN</div>
        <div className="text-xl font-bold my-3">Phone Number</div>
        <input id={styles.loginphone} onChange={validatePhone} className="w-1/2 bg-cool-1 text-lg text-center rounded-lg"></input>
        <div className="text-xl font-bold my-3">Password</div>
        <input type="password" id={styles.loginpassword} onChange={validatePassword} className="w-1/2 bg-cool-1 text-lg text-center rounded-lg"></input>
        <div className="flex flex-row items-center justify-center my-10">
          <div className="rounded-xl text-center bg-green-600 w-24 p-3 m-4 cursor-pointer hover:brightness-125 transition">Register</div>
          <div className="rounded-xl text-center bg-green-600 w-24 p-3 m-4 cursor-pointer hover:brightness-125 transition" onClick={() => {
            if (loading) return;
            setLoading(true);
            if (!validatePhone() || !validatePassword()) {
              setError("Invalid Phone or Password...");
              setLoading(false);
              return;
            }
            fetch("/api/login", {
              mode: 'cors',
              method: 'POST',
              body: JSON.stringify({
                phone: (document.getElementById(styles.loginphone) as HTMLInputElement).value,
                password: (document.getElementById(styles.loginpassword) as HTMLInputElement).value,
              }),
            }).then(async (result) => {
              if (result.status !== 200) {
                setLoading(false);
                return console.log(`Login error ${result.status}...`);
              }
              const data = (await result.json()).data;
              setLoading(false);
              const userData: UserData = {
                first_name: data.first_name,
                last_name: data.last_name,
                password: data.password,
                phone: data.phone,
              };
              localStorage.setItem("user", JSON.stringify(userData));
              setUser(userData);
            })
            .catch((err) => {
              console.log(err);
            });
          }}>Login</div>
        </div>
        {loading && <LoadIcon className="w-6 h-6 animate-spin" />}
        {error && <div className="text-center text-red-500 font-black">{error}</div>}
      </div>
    </div>
  )
}