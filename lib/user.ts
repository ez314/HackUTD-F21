export interface UserData {
  phone: string;
  password: string;
  name: string;
}

export function getUser() {
  let user = localStorage.getItem("login");
  if (user) return JSON.parse(user) as UserData;
  return undefined;
}