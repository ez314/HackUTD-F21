import styles from "./style.module.css";
interface LoginProps {
  setUser
}

function validatePhone() {
  const regex = /^\d{10}$/
  const e = document.getElementById(styles.loginphone) as HTMLInputElement;
  const phone = e.value;
  let color = '#F24855';
  if (phone.match(regex)) color = '#26CF5E';
  if (phone === undefined || phone === '') color = '#F5F5F5';
  e.style.setProperty('--color', color);
}
function validatePassword() {
  const e = document.getElementById(styles.loginpassword) as HTMLInputElement;
  const password = e.value;
  let color = '#F24855';
  if (password.length >= 8) color = '#26CF5E'
  if (password === undefined || password === '') color = '#F5F5F5'
  e.style.setProperty('--color', color);
}

export default function Login({ setUser }: LoginProps) {
  return (
    <div id="login" className="absolute flex items-center justify-center w-full h-full bg-custom-modal z-10">
      <div id="loginactual" className="relative flex flex-col items-center w-1/3 h-3/5 p-3 bg-custom-gray-0 rounded-xl text-white">
        <div className="text-3xl font-black mb-7">LOGIN</div>
        <div className="text-xl font-bold my-3">Phone Number</div>
        <input id={styles.loginphone} onChange={validatePhone} className="w-1/2 bg-custom-gray-1 text-lg text-center rounded-lg"></input>
        <div className="text-xl font-bold my-3">Password</div>
        <input type="password" id={styles.loginpassword} onChange={validatePassword} className="w-1/2 bg-custom-gray-1 text-lg text-center rounded-lg"></input>
        <div className="flex flex-row items-center justify-center m-auto">
          <div className="rounded-xl text-center bg-custom-blue w-24 p-3 m-4 cursor-pointer hover:brightness-125 transition">Register</div>
          <div className="rounded-xl text-center bg-custom-blue w-24 p-3 m-4 cursor-pointer hover:brightness-125 transition" onClick={() => {
            localStorage.setItem("user", JSON.stringify({ name: "NICK" }))
            setUser({ name: "NICK" })
          }}>Login</div>
        </div>
      </div>
    </div>
  )
}