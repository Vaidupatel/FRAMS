const { Router } = require("express");
const router = Router();
const fetchUser = require("../middleware/fetchUser.js");
const RootAdmin = require("../models/RootAdmin.js");

// ROUTE 1 : Get root admin data using : GET "api/user/fetchuser" login required
router.get("/fetchuser", fetchUser, async (req, res) => {
  try {
    const data = await RootAdmin.findOne({ _id: req.user.id });
    res.json(data);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("internal server error");
  }
});
// export default router;
module.exports = router;
