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
    const imagesArray = Array.from(formData.images);
    const promises = imagesArray.map((image) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onload = () => {
          const base64String = reader.result.split(",")[1];
          resolve(base64String);
        };
        reader.onerror = (error) => reject(error);
      });
    });

    Promise.all(promises)
      .then((base64Images) => {
        // Combine base64Images with other form data
        const updatedFormData = { ...formData, images: base64Images };
        // Log form data to console
        console.log("Form data from AdminPanel:", updatedFormData);
        setIsNewUserModalOpen(false);
      })
      .catch((error) => {
        console.error("Error converting images to base64:", error);
      });
    // console.log("Form data from AdminPanel:", formData);

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
