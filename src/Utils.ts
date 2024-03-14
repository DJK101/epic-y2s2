
export default function CurrentUser(){
  const userData = localStorage.getItem("currentUser");
  if (userData) {
    const user = JSON.parse(userData);
    return user;
  }
  return null;
};