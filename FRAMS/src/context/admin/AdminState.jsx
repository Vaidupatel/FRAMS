import { useState } from "react";
import AdminContext from "./AdminContext";

const AdminState = (props) => {
  const host = "http://localhost:5000";
  const adminInitials = null;
  const [admin, setAdmin] = useState(adminInitials);
  const authToken = localStorage.getItem("authToken");

  //Get Admin Data
  const getRootAdmin = async () => {
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
    <AdminContext.Provider value={{ admin, getRootAdmin }}>
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminState;
// module.exports = AdminState;
