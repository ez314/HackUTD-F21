export interface UserData {
  phone: string;
  password: string;
  first_name: string;
  last_name: string;
}

export function getUser() {
  let user = localStorage.getItem("user");
  if (user) return JSON.parse(user) as UserData;
  return undefined;
}