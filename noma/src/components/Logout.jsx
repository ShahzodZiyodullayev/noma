import React from "react";
import { useNavigate } from "react-router-dom";
import { BiPowerOff } from "react-icons/bi";

function Logout() {
  const navigate = useNavigate();
  const handleClick = async () => {
    localStorage.clear();
    navigate("/register");
  };

  return (
    <div>
      <BiPowerOff onClick={handleClick} />
    </div>
  );
}

export default Logout;
