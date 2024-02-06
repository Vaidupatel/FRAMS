const { verify } =require( "jsonwebtoken");
const jWT_SECRET = "OmfoooTuDekhengaMeraToken";

const fetchUser = (req, res, next) => {
  // Get the user from the jwt token and add id to request object
  const token = req.header("auth-token");
  if (!token) {
    res
      .status(401)
      .send({ error: "Please authenticate using the valid token" });
  }
  try {
    const data = verify(token, jWT_SECRET);
    // console.log("Decoded token data:", data);
    req.user = data.rootAdmin;
    next();
  } catch (error) {
    console.log("Error verifying token:", error);
    res
      .status(401)
      .send({ error: "Please authenticate using the valid token" });
  }
};

// export default fetchUser;
module.exports = fetchUser;
