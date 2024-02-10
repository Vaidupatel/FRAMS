import {
  Modal,
  Box,
  Typography,
  Button,
  Stack,
  TextField,
} from "@mui/material";
import { Form, Formik } from "formik";
import PropTypes from "prop-types";
import * as Yup from "yup";

// Initialize the value for form
const initialValues = {
  name: "",
  id: "",
  email: "",
  password: "",
  cpasswprd: "",
};

// Validation schema for form
const validationSchema = Yup.object({
  name: Yup.string()
    .required("Name is required")
    .matches(/^[^0-9]*$/, "Name must not contain numeric characters")
    .min(3, "Name should be minimum of 3 characters"),
  id: Yup.number()
    .typeError("ID must be a number")
    .required("ID is required")
    .test({
      name: "len",
      message: "ID must be exactly 15 digits",
      test: (val) => val && val.toString().length === 15,
    }),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .matches(
      /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$/,
      "Password must contain at least one letter, one number, and one special character, and be at least 6 characters long"
    ),
  cpasswprd: Yup.string()
    .oneOf([Yup.ref("password"), null], "Password must be same")
    .required("Confirm Password is required"),
});

function NewUserModal({ isOpen, onClose, onSubmit }) {
  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "50vw",
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h5" gutterBottom>
          Fill out the form
        </Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          validateOnBlur={true}
        >
          {(formik) => {
            return (
              <Form>
                <Stack m={2} spacing={2}>
                  <TextField
                    label="Name"
                    id="name"
                    // type="text"
                    name="name"
                    value={formik.values.name}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                  />
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
                    label="Email"
                    id="email"
                    name="email"
                    value={formik.values.email}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                  />
                  <TextField
                    label="Password"
                    id="password"
                    type="password"
                    name="password"
                    autoComplete="off"
                    value={formik.values.password}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.password && Boolean(formik.errors.password)
                    }
                    helperText={
                      formik.touched.password && formik.errors.password
                    }
                  />
                  <TextField
                    label="Confirm Password"
                    id="cpasswprd"
                    type="password"
                    name="cpasswprd"
                    autoComplete="off"
                    value={formik.values.cpasswprd}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.cpasswprd &&
                      Boolean(formik.errors.cpasswprd)
                    }
                    helperText={
                      formik.touched.cpasswprd && formik.errors.cpasswprd
                    }
                  />
                </Stack>
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  disabled={!formik.isValid || formik.isSubmitting}
                >
                  Submit
                </Button>
                <Button onClick={onClose}>Cancel</Button>
              </Form>
            );
          }}
        </Formik>
      </Box>
    </Modal>
  );
}

NewUserModal.propTypes  = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default NewUserModal;
