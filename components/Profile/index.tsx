import { useState } from "react";
import { getUser, UserData } from "../../lib/user";
import LoadIcon from "../icon/LoadIcon";
import styles from "./style.module.css";
interface ProfileProps {
  setUser;
  setProfile;
}

function validateFirstName() {
  const regex = /^[A-Z][a-z]+$/
  const e = document.getElementById(styles.profilefirst) as HTMLInputElement;
  const phone = e.value;
  let validated = false;
  let color = '#F24855';
  if (phone.match(regex)) {
    color = '#26CF5E';
    validated = true;
  }
  if (phone === undefined || phone === '') color = '#F5F5F5';
  e.style.setProperty('--color', color);
  return validated;
}
function validateLastName() {
  const regex = /^[A-Z][a-z]+$/
  const e = document.getElementById(styles.profilelast) as HTMLInputElement;
  const phone = e.value;
  let validated = false;
  let color = '#F24855';
  if (phone.match(regex)) {
    color = '#26CF5E';
    validated = true;
  }
  if (phone === undefined || phone === '') color = '#F5F5F5';
  e.style.setProperty('--color', color);
  return validated;
}
function validatePassword() {
  const e = document.getElementById(styles.loginpassword) as HTMLInputElement;
  const password = e.value;
  let validated = false;
  let color = '#F24855';
  if (password.length >= 8) {
    color = '#26CF5E';
    validated = true;
  }
  if (password === undefined || password === '') color = '#F5F5F5';
  e.style.setProperty('--color', color);
  return validated;
}

export default function Profile({ setUser, setProfile }: ProfileProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  let user = getUser();
  return (
    <div id="profile" className="absolute flex items-center justify-center w-full h-full bg-custom-modal z-10">
      <div id="profileactual" className="relative flex flex-col items-center w-1/3 h-max p-3 bg-custom-gray-0 rounded-xl text-white">
        <div className="text-3xl font-black mb-7">PROFILE</div>
        <div className="text-xl font-bold my-3">First Name</div>
        <input id={styles.profilefirst} onChange={validateFirstName} className="w-1/2 bg-custom-gray-1 text-lg text-center rounded-lg" placeholder={user.first_name}></input>
        <div className="text-xl font-bold my-3">Last Name</div>
        <input id={styles.profilelast} onChange={validateLastName} className="w-1/2 bg-custom-gray-1 text-lg text-center rounded-lg" placeholder={user.last_name}></input>
        <div className="flex flex-row items-center justify-center mt-10">
          <div className="rounded-xl text-center bg-custom-blue w-24 p-3 m-4 cursor-pointer hover:brightness-125 transition" onClick={() => {
            setLoading(true);
            if (!validateFirstName() || !validateLastName()) {
              setLoading(false);
              return setError("Invalid profile data...");
            }
            fetch("/api/profile", {
              mode: 'cors',
              method: 'POST',
              body: JSON.stringify({
                phone: user.phone,
                first_name: (document.getElementById(styles.profilefirst) as HTMLInputElement).value,
                last_name: (document.getElementById(styles.profilelast) as HTMLInputElement).value,
                watchlist: user.watchlist,
              }),
            }).then(async (result) => {
              if (result.status !== 200) {
                setError("User update failed...");
                setLoading(false);
                return console.log(`Profile update error ${result.status}...`);
              }
              const data = (await result.json()).data;
              setLoading(false);
              const userData: UserData = {
                first_name: data.first_name,
                last_name: data.last_name,
                password: user.password,
                phone: user.phone,
                watchlist: user.watchlist,
              };
              localStorage.setItem("user", JSON.stringify(userData));
              setUser(userData);
              setProfile(false);
            })
            .catch((err) => {
              console.log(err);
            });
          }}>Save</div>
        </div>
        {loading && <LoadIcon className="w-6 h-6 animate-spin" />}
        {error && <div className="text-center text-custom-red font-black">{error}</div>}
      </div>
    </div>
  )
}