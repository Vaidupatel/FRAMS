import { Button } from "@mui/material";
import { useState } from "react";
import NewUserModal from "./NewUserModal";
// const { connect, connection } = require("mongoose");
// const mongoPass = "4iV9cexpfHXV9UUu";
// const fs = require("fs");

// const mongoURI = `mongodb+srv://vaidkumar31:${mongoPass}@cluster0.dblhkka.mongodb.net/images?retryWrites=true&w=majority`;

function AdminActivities() {
  const [isNewUserModalOpen, setIsNewUserModalOpen] = useState(false);
  const [imageBase64Array, setImageBase64Array] = useState([]);

  const handleOpenNewUserModal = () => {
    setIsNewUserModalOpen(true);
  };

  const handleCloseNewUserModal = () => {
    setIsNewUserModalOpen(false);
  };
  const chunkSize = 100000;
  const handleSubmitNewUserModal = async (formData) => {
    try {
      // const response = await fetch(
      //   `http://localhost:5000/api/auth/create${formData.designation}`,
      //   {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify({
      //       name: formData.name,
      //       adminID: formData.id,
      //       email: formData.email,
      //       mobile: formData.mobile,
      //       password: formData.password,
      //       designation: formData.designation,
      //       isImageSubmited: false,
      //     }),
      //   }
      // );
      // const json = await response.json();
      // console.log("Registration Response", json);
      // ===============================================================================
      try {
        for (let i = 0; i < imageBase64Array.length; i++) {
          const image = imageBase64Array[i];
          const imageID = `image_${i + 1}`;
          const imageDataChunks = [];
          for (let j = 0; j < image.length; j += chunkSize) {
            const chunk = image.slice(j, j + chunkSize);
            imageDataChunks.push(chunk);
          }
          await sendImageChunks(formData, imageID, imageDataChunks);
        }
        console.log("All images chunks send to route successfully");
      } catch (error) {
        console.error("An error occurred:", error);
      }
      // ===============================================================================
    } catch (error) {
      console.error("An error occurred:", error);
    }
    // console.log("Form data from AdminPanel:", formData);
    setIsNewUserModalOpen(false);
  };

  const sendImageChunks = async (formData, imageID, imageDataChunks) => {
    for (let index = 0; index < imageDataChunks.length; index++) {
      const totalChunks = imageDataChunks.length;
      const chunk = imageDataChunks[index];
      const response = await fetch(
        "http://localhost:5000/api/auth/storeimages",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            adminID: formData.id,
            designation: formData.designation,
            imageID: imageID,
            totalChunks: totalChunks,
            chunkID: index + 1,
            imageData: chunk,
          }),
        }
      );

      const json = await response.json();
      console.log(`Chunk ${index + 1} Response`, json);
    }
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
