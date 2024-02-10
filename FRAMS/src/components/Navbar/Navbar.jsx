import {
  AppBar,
  Avatar,
  Button,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import { useSelector } from "react-redux";
import "./Navbar.css";

function Navbar() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  // console.log(isLoggedIn);
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h3"
          component="div"
          color="inherit"
          sx={{ flexGrow: "1", fontFamily: "logo" }}
        >
          FRAMS
        </Typography>

        <Stack direction="row" spacing={2}>
          <Button
            color="inherit"
            component={Link}
            to="/"
            sx={{ fontSize: "1.3rem" }}
          >
            Home
          </Button>

          {!isLoggedIn ? (
            <Button
              color="inherit"
              component={Link}
              to="/login"
              sx={{ fontSize: "1.3rem" }}
            >
              Login
            </Button>
          ) : (
            <Button
              color="inherit"
              component={Link}
              to="/adminpanel"
              sx={{ fontSize: "1.3rem" }}
            >
              Dashboard
            </Button>
          )}
          <Button
            color="inherit"
            component={Link}
            to="/help"
            sx={{ fontSize: "1.3rem" }}
          >
            Help
          </Button>
          <Avatar
            alt="User"
            sx={{
              width: 50,
              height: 50,
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
