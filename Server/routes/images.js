const { Router } = require("express");
const router = Router();
const Image = require("../models/ImagesData");
const { body, validationResult } = require("express-validator");
const { sign } = require("jsonwebtoken");
const Admin = require("../models/Admin");
const jWT_SECRET = "OmfoooTuDekhengaMeraToken";

// ROUTE 1: Store the Base64  : POST "/api/auth/storeimages". No login requires
router.post(
  "/storeimages",
  [
    body("userName", "Enter valid name").isLength({ min: 3 }),
    body("userID", "Enter valid id").isLength({ min: 15, max: 15 }),
    body("userDesig", "Enter valid designation").notEmpty(),
    body("userLabel", "Enter valid label").notEmpty(),
    body("image1", "Enter valid image data").isString(),
    body("image2", "Enter valid image data").isString(),
    body("image3", "Enter valid image data").isString(),
    body("image4", "Enter valid image data").isString(),
    body("image5", "Enter valid image data").isString(),
  ],
  async (req, res) => {
    // console.log(req.body);
    let success = false;
    // if there is error, return error
    const errors = validationResult(req);
    // console.log(errors.array());
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }
    // Check if admin with ID is exist and images are uploaded or not
    try {
      let admin = await Admin.findOne({
        adminID: req.body.userID,
        isImageSubmited: true,
      });
      if (admin) {
        return res.status(400).json({
          success,
          error:
            "Sorry, admin with same ID already exists and images are already submited",
        });
      }

      //   Create a new document for user image
      //   const uLabel = `${req.body.name}_${req.body.userID}_${req.body.userDesig}`;
      userImage = await Image({
        userName: req.body.userName,
        userID: req.body.userID,
        userDesig: req.body.userDesig,
        userLabel: req.body.userLabel,
        image1: req.body.image1,
        image2: req.body.image2,
        image3: req.body.image3,
        image4: req.body.image4,
        image5: req.body.image5,
      });

      await userImage.save();
      const data = {
        userImage: {
          id: userImage.id,
          //   label: userImage.label,
        },
      };
      const authTocken = sign(data, jWT_SECRET);
      console.log(authTocken);
      success = true;
      res.json({ success, authTocken });
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal server error: ");
    }
  }
);

module.exports = router;
