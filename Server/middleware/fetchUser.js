const { verify } = require("jsonwebtoken");
const jWT_SECRET = "OmfoooTuDekhengaMeraToken";

const fetchUser = async (req, res, next) => {
  // Get the user from the jwt token and add id to request object
  // console.log(req.header)
  const token = await req.header("auth-token");
  // token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb290QWRtaW4iOnsiaWQiOiI2NWM3MGUzNDBlYjg3Y2I4MTY1ODk3ZGIifSwiaWF0IjoxNzA3NTY1OTY3fQ.vF0wrLWXl15k-8-nQ7YRvEZPY-0i_EK1h6ST3WysTxE"
  // console.log(token);
  if (!token) {
    res
      .status(401)
      .send({ error: "Please authenticate using the valid token" });
  } else {
    try {
      const data = verify(token, jWT_SECRET);
      // console.log("Decoded token data:", data);
      req.user = await data.rootAdmin;
      // console.log(req.user);
      next();
    } catch (error) {
      console.log("Error verifying token:", error);
      res
        .status(401)
        .send({ error: "Please authenticate using the valid token" });
    }
  }
};

// export default fetchUser;
module.exports = fetchUser;
