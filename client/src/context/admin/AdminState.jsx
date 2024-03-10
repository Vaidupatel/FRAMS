import { useState } from "react";
import { adminContext } from "./AdminContext";
const AdminState = (props) => {
  const host = "http://localhost:5000";
  const adminInitials = null;
  const [admin, setAdmin] = useState(adminInitials);
  
  //Get Admin Data
  const getRootAdmin = async () => {
    const authToken = localStorage.getItem("authToken");
    const response = await fetch(`${host}/api/user/fetchuser`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": authToken,
      },
    });

    const json = await response.json();
    setAdmin(json);
    // console.log(json)
  };

  return (
    <adminContext.Provider value={{ admin, getRootAdmin }}>
      {props.children}
    </adminContext.Provider>
  );
};
export default AdminState;
// module.exports = AdminState;
