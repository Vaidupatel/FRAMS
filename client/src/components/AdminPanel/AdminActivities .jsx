import { Button } from "@mui/material";
import { useState } from "react";
import NewUserModal from "./NewUserModal";

function AdminActivities() {
  const [isNewUserModalOpen, setIsNewUserModalOpen] = useState(false);

  const handleOpenNewUserModal = () => {
    setIsNewUserModalOpen(true);
  };

  const handleCloseNewUserModal = () => {
    setIsNewUserModalOpen(false);
  };

  const handleSubmitNewUserModal = (formData) => {
    // Handle form submission logic here
    console.log("Form data from AdminPanel:", formData);
    
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
      />
    </div>
  );
}

export default AdminActivities;
