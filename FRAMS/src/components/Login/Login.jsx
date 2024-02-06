import {
  Box,
  Button,
  Card,
  CardContent,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

const initialValues = {
  id: "",
  password: "",
  designation: "",
};
const validationSchema = Yup.object({
  id: Yup.number()
    .typeError("ID must be a number")
    .required("ID is required")
    .test({
      name: "len",
      message: "ID must be exactly 15 digits",
      test: (val) => val && val.toString().length === 15,
    }),
  password: Yup.string().required("Password is required"),
  designation: Yup.string().required("Designation is required"),
});

function Login() {
  const navigate = useNavigate();

  const onSubmit = async (values, formik) => {
    // console.log(values);
    try {
      if (values.designation === "admin") {
        // console.log("admin");
        const response = await fetch(
          "http://localhost:5000/api/auth/rootadmin/login",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: values.id,
              password: values.password,
            }),
          }
        );
        const json = await response.json();
        // console.log(json);
        if (json.success) {
          localStorage.setItem("authToken", json.authToken);
          formik.resetForm();
          navigate("/adminpanel");
        } else {
          console.error(json.error);
        }
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }

    // onSubmitProps.resetForm();
  };

  return (
    <Box component="div" spacing={2} width="40vw" margin="auto" marginTop={7}>
      <Card>
        <CardContent>
          <Stack spacing={3}>
            <Typography
              component="div"
              variant="h3"
              color="primary.dark"
              align="center"
            >
              Login
            </Typography>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
              // validateOnBlur
            >
              {(formik) => {
                // console.log(formik);
                return (
                  <Form>
                    <Stack spacing={2}>
                      <TextField
                        label="ID"
                        id="id"
                        name="id"
                        value={formik.values.id}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        error={formik.touched.id && Boolean(formik.errors.id)}
                        helperText={formik.touched.id && formik.errors.id}
                      />
                      <TextField
                        label="Password"
                        id="password"
                        name="password"
                        value={formik.values.password}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        error={
                          formik.touched.password &&
                          Boolean(formik.errors.password)
                        }
                        helperText={
                          formik.touched.password && formik.errors.password
                        }
                      />

                      <Stack component="div" spacing={2} direction="row">
                        <Box width="200px">
                          <TextField
                            select
                            label="Designation"
                            name="designation"
                            id="designation"
                            fullWidth
                            variant="outlined"
                            size="small"
                            value={formik.values.designation}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            error={
                              formik.touched.designation &&
                              Boolean(formik.errors.designation)
                            }
                            helperText={
                              formik.touched.designation &&
                              formik.errors.designation
                            }
                          >
                            <MenuItem value="employee">Employee</MenuItem>
                            <MenuItem value="staf">Staf</MenuItem>
                            <MenuItem value="admin">Admin</MenuItem>
                          </TextField>
                        </Box>
                        <Button
                          variant="contained"
                          type="submit"
                          disabled={!formik.isValid || formik.isSubmitting}
                          style={{ height: "40px", width: "120px" }}
                        >
                          Submit
                        </Button>
                      </Stack>
                    </Stack>
                  </Form>
                );
              }}
            </Formik>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}

export default Login;
