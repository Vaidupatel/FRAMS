const { Router } = require("express");
const router = Router();
const Admin = require("../models/Admin.js");
const RootAdmin = require("../models/RootAdmin.js");
const { body, validationResult } = require("express-validator");
const { genSalt, hash, compare } = require("bcrypt");
const { sign } = require("jsonwebtoken");
const jWT_SECRET = "OmfoooTuDekhengaMeraToken";
// router.use(express.json());

// ROUTE 1: create the root admin using : POST "/api/auth/createRootAdmin". no login required
router.post(
  "/createRootAdmin",
  [
    body("name", "Enter valid name").isLength({ min: 3 }),
    body("rootAdminId", "Enter valid id").isLength({ min: 15, max: 15 }),
    body("email", "Enter valid email").isEmail(),
    body("designation", "Enter valid designation").notEmpty(),
    body("mobile", "Enter valid mobile number").isMobilePhone(),
    body("password", "Enter valid password").isLength({ min: 5 }),
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
    // Check if Root Admin with same adminId exists or not
    try {
      let rootAdmin = await RootAdmin.findOne({
        rootAdminId: req.body.rootAdminId,
      });
      if (rootAdmin) {
        return res.status(400).json({
          success,
          error: "Sorry, root admin with same ID already exists",
        });
      }
      const salt = await genSalt(10);
      let secPassword = await hash(req.body.password, salt);
      //   Create a new Admin
      rootAdmin = await RootAdmin({
        name: req.body.name,
        rootAdminId: req.body.rootAdminId,
        designation: req.body.designation,
        email: req.body.email,
        mobile: req.body.mobile,
        password: secPassword,
      });
      await rootAdmin.save();
      const data = {
        rootAdmin: {
          id: rootAdmin.id,
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

// ROUTE 2: Create the admin using: POST "/api/auth/createAdmin". No login required
router.post(
  "/createAdmin",
  [
    body("name", "Enter valid name").isLength({ min: 3 }),
    body("adminID", "Enter valid id").isLength({ min: 15, max: 15 }),
    body("email", "Enter valid email").isEmail(),
    body("mobile", "Enter valid mobile number").isMobilePhone(),
    body("password", "Enter valid password").isLength({ min: 5 }),
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
    // Check if Admin with same adminId exists or not
    try {
      let admin = await Admin.findOne({ adminID: req.body.adminID });
      if (admin) {
        return res.status(400).json({
          success,
          error: "Sorry, admin with same ID already exists",
        });
      }
      const salt = await genSalt(10);
      let secPassword = await hash(req.body.password, salt);
      //   Create a new Admin
      admin = await Admin.create({
        name: req.body.name,
        adminID: req.body.adminID,
        email: req.body.email,
        mobile: req.body.mobile,
        password: secPassword,
      });
      const data = {
        admin: {
          id: admin.id,
        },
      };
      await admin.save();
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

// ROUTE 3:  Authenticate the root admin using: POST "/api/auth/root/login". No login required
router.post(
  "/login",
  [
    body("id", "Enter the valid id").isLength({ min: 15, max: 15 }),
    body("password", "Password can't be blank").exists(),
  ],
  async (req, res) => {
    let success = false;
    // If there are errors,return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { id, password } = req.body;
    try {
      let rootAdmin = await RootAdmin.findOne({ rootAdminId: id });
      if (!rootAdmin) {
        return res.status(400).json({
          success,
          error:
            "No record found! Please try to login with correct credentials!",
        });
      }
      const passwordCompare = await compare(password, rootAdmin.password);
      if (!passwordCompare) {
        return res.status(400).json({
          success,
          error: "Please try to login with correct credentials!",
        });
      }
      const data = {
        rootAdmin: {
          id: rootAdmin.id,
        },
      };
      success = true;
      const authToken = sign(data, jWT_SECRET);
      res.json({ success, authToken });
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal server error");
    }
  }
);

// export default router;
module.exports = router;
