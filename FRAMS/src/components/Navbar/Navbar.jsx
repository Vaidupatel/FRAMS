import {
  AppBar,
  Avatar,
  Button,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import "./Navbar.css";
function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    console.log("Logout completed");
    navigate("/login");
  };
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h4"
          component="div"
          color="inherit"
          sx={{ flexGrow: "1", fontFamily: "logo" }}
        >
          FRAMS
        </Typography>
        <Stack direction="row" spacing={2}>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>

          {!localStorage.getItem("authToken") ? (
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
          ) : (
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          )}
          <Button color="inherit" component={Link} to="/help">
            Help
          </Button>
          <Avatar
            alt="User"
            sx={{
              width: 40,
              height: 40,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <PersonIcon />
          </Avatar>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
