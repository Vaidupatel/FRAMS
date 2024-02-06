import { useContext, useEffect } from "react";
import AdminContext from "../../context/admin/AdminContext.jsx";
import { useNavigate } from "react-router-dom";

function AdminPanel() {
  const navigate = useNavigate();
  const context = useContext(AdminContext);
  const { admin, getRootAdmin } = context || {};
  useEffect(() => {
    if (localStorage.getItem("rootAdminToken")) {
      getRootAdmin();
    } else {
      navigate("/login");
    }
  }, []);
  if (admin === null) {
    return <div>Loading...</div>; // or you can return null or any other loading indicator
  }
  const name = admin && admin.name;
  return <div>Admin Panel for {name} </div>;
}

export default AdminPanel;
