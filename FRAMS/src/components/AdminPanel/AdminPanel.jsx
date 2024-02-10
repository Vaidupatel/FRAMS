import { useContext, useEffect } from "react";
// import AdminContext from "../../context/admin/AdminContext.jsx";
import { adminContext } from "../../context/admin/AdminContext.jsx";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../app/authSlice.js";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import AdminActivities from "./AdminActivities .jsx";

function AdminPanel() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const context = useContext(adminContext);
  const { admin, getRootAdmin } = context || {};
  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      getRootAdmin();
    } else {
      navigate("/login");
    }
  }, [getRootAdmin, navigate]);

  if (admin === null) {
    return <div>Loading...</div>;
  }
  const name = admin && admin.name;
  const id = admin && admin.rootAdminId;
  const email = admin && admin.email;
  const mobile = admin && admin.mobile;
  const designation = admin && admin.designation;

  const handleLogout = () => {
    const logoutState = confirm("Are you sure you want to log out");
    if (logoutState) {
      localStorage.clear();
      dispatch(logout());
      navigate("/login");
    }
  };

  // console.log(admin);
  return (
    <>
      <Box width="90vw" margin="auto" marginTop="2rem">
        <Card elevation={10}>
          <CardContent>
            {/* Admin Information */}
            <Divider />
            <Stack direction="row" m={2}>
              <Box width="9rem" padding="1px">
                <CardMedia
                  border="2px solid black"
                  component="img"
                  image="src/jpeg-optimizer_vaidik 10kb.jpg"
                  alt="Admin"
                />
              </Box>
              <Box
                margin="0 0 0 1rem "
                sx={{ width: "400px", bgcolor: "#efefef" }}
              >
                <List>
                  <ListItem>
                    <ListItemText
                      primary={
                        <Stack direction="row">
                          <Typography variant="h6" color="primary">
                            Id :
                          </Typography>
                          <Typography variant="h6" margin="0 0 0 5px">
                            {id}
                          </Typography>
                        </Stack>
                      }
                    />
                  </ListItem>
                  <Divider />
                  <ListItem sx={{ bgcolor: "#efefef" }}>
                    <ListItemText
                      primary={
                        <Stack direction="row">
                          <Typography variant="h6" color="primary">
                            Name :
                          </Typography>
                          <Typography variant="h6" margin="0 0 0 5px">
                            {name}
                          </Typography>
                        </Stack>
                      }
                    />
                  </ListItem>
                </List>
              </Box>
              <Box
                margin="0 0 0 1rem "
                sx={{ width: "400px", bgcolor: "#efefef" }}
              >
                <List>
                  <ListItem>
                    <ListItemText
                      primary={
                        <Stack direction="row">
                          <Typography variant="h6" color="primary">
                            Email :
                          </Typography>
                          <Typography variant="h6" margin="0 0 0 5px">
                            {email}
                          </Typography>
                        </Stack>
                      }
                    />
                  </ListItem>
                  <Divider />
                  <ListItem sx={{ bgcolor: "#efefef" }}>
                    <ListItemText
                      primary={
                        <Stack direction="row">
                          <Typography variant="h6" color="primary">
                            Designation :
                          </Typography>
                          <Typography variant="h6" margin="0 0 0 5px">
                            {designation}
                          </Typography>
                        </Stack>
                      }
                    />
                  </ListItem>
                </List>
              </Box>
              <Box
                margin="0 0 0 1rem "
                sx={{ width: "400px", bgcolor: "#efefef" }}
              >
                <List>
                  <ListItem>
                    <ListItemText
                      primary={
                        <Stack direction="row">
                          <Typography variant="h6" color="primary">
                            Mobile :
                          </Typography>
                          <Typography variant="h6" margin="0 0 0 5px">
                            {mobile}
                          </Typography>
                        </Stack>
                      }
                    />
                  </ListItem>
                  <Divider />
                  <ListItemButton onClick={handleLogout}>
                    <ListItemText>
                      <Typography variant="h6" color="primary">
                        Logout
                      </Typography>
                    </ListItemText>
                  </ListItemButton>
                </List>
              </Box>
            </Stack>
            {/* Admin Activities */}
            <Stack m={2}>
              <Box>
                <AdminActivities />
              </Box>
            </Stack>
          </CardContent>
        </Card>
      </Box>
    </>
  );
}

export default AdminPanel;
