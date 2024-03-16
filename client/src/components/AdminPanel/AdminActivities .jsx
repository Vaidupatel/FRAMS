import { Button } from "@mui/material";
import { useState } from "react";
import NewUserModal from "./NewUserModal";

function AdminActivities() {
  const [isNewUserModalOpen, setIsNewUserModalOpen] = useState(false);
  const [imageBase64Array, setImageBase64Array] = useState([]);

  const handleOpenNewUserModal = () => {
    setIsNewUserModalOpen(true);
  };

  const handleCloseNewUserModal = () => {
    setIsNewUserModalOpen(false);
  };

  const handleSubmitNewUserModal = async (formData) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/auth/create${formData.designation}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            adminID: formData.id,
            email: formData.email,
            mobile: formData.mobile,
            password: formData.password,
            designation: formData.designation,
            isImageSubmited: false,
          }),
        }
      );
      const json = await response.json();
      console.log("Registration Response", json);
    } catch (error) {
      console.error("An error occurred:", error);
    }

    // console.log("Form data from AdminPanel:", formData);
    // console.log("Image base64 array:", imageBase64Array);

    setIsNewUserModalOpen(false);
  };

  return (
    <div>
      <Button
        onClick={handleOpenNewUserModal}
        variant="contained"
        color="primary"
      >
        Add New User
      </Button>
      <NewUserModal
        isOpen={isNewUserModalOpen}
        onClose={handleCloseNewUserModal}
        onSubmit={handleSubmitNewUserModal}
        setImageBase64Array={setImageBase64Array}
      />
    </div>
  );
}

export default AdminActivities;
