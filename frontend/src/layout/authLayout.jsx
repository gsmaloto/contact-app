import React from "react";
import useAuthStore from "../stores/authStore";

const authLayout = () => {
  const userLogged = useAuthStore((state) => state.userLogged);
  return <div>authLayout</div>;
};

export default authLayout;
