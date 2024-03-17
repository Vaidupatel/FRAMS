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

      /**---------------------------------------------------------------------------------------------------------------- */
      const imagePromises = imageBase64Array.map(
        async (imageData, imageIndex) => {
          // Calculate the chunk size
          const chunkSize = 100000;
          const totalChunks = Math.ceil(imageData.length / chunkSize);
          const chunkPromises = [];

          // Iterate over the total number of chunks
          for (let chunkIndex = 0; chunkIndex < totalChunks; chunkIndex++) {
            const start = chunkIndex * chunkSize;
            const end = Math.min(start + chunkSize, imageData.length);

            // Extract the chunk data
            const chunkData = imageData.slice(start, end);

            // Send each chunk as a separate request
            const response = await fetch(
              "http://localhost:5000/api/auth/storeimages",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  adminID: formData.id,
                  imageID: imageIndex + 1,
                  chunkID: chunkIndex + 1, // Calculate the chunk ID
                  imageData: chunkData,
                }),
              }
            );

            const data = await response.json();
            console.log(
              `Image ${imageIndex + 1}, Chunk ${
                chunkIndex + 1
              } Storage Response:`,
              data
            );
            chunkPromises.push(data);
          }

          return Promise.all(chunkPromises);
        }
      );

      await Promise.all(imagePromises);
    } catch (error) {
      console.error("An error occurred:", error);
    }
    // console.log("Form data from AdminPanel:", formData);
    // const chunkData = imageBase64Array[0];
    // console.log(imageBase64Array[0].length)
    // console.log(imageBase64Array[1].length)
    // console.log(imageBase64Array[2].length)
    // console.log(imageBase64Array[3].length)
    // console.log(imageBase64Array[4].length)
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
