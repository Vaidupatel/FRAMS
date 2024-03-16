import {
  Modal,
  Box,
  Typography,
  Button,
  Stack,
  TextField,
  MenuItem,
  FormControl,
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
  designation: "",
  mobile: "",
  images: [],
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
  mobile: Yup.string()
    .required("Mobile Number is required")
    .matches(/^[0-9]{10}$/, "Mobile Number must be 10 digits"),
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
  designation: Yup.string().required("Designation is required"),
  images: Yup.array()
    .required("Please upload 5 photos")
    .min(5, "Please upload exactly 5 photos")
    .max(5, "Please upload exactly 5 photos")
    .test({
      name: "fileType",
      message: "Please upload only image files",
      test: (value) => {
        if (!value) return true; // If no files are uploaded, validation passes
        return value.every((file) => /^image\/(jpeg|png|gif)$/.test(file.type));
      },
    }),
});

function NewUserModal({ isOpen, onClose, onSubmit, setImageBase64Array }) {
  const handleFileChange = (event, formik) => {
    const filesArray = Array.from(event.currentTarget.files);
    const base64Array = [];

    filesArray.forEach((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64String = reader.result.split(",")[1];
        base64Array.push(base64String);
        setImageBase64Array(base64Array);
      };
    });
    formik.setFieldValue("images", filesArray);
  };
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
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          validateOnBlur={true}
        >
          {(formik, setImageBase64Array) => {
            return (
              <Form>
                <Stack m={2} spacing={2}>
                  <Typography variant="h5" gutterBottom>
                    Fill out the form
                  </Typography>
                  <TextField
                    label="Name"
                    id="name"
                    // type="text"
                    size="small"
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
                    size="small"
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
                    size="small"
                    value={formik.values.email}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                  />
                  <TextField
                    label="Mobile Number"
                    id="mobile"
                    name="mobile"
                    size="small"
                    value={formik.values.mobile}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.mobile && Boolean(formik.errors.mobile)
                    }
                    helperText={formik.touched.mobile && formik.errors.mobile}
                  />
                  <TextField
                    select
                    label="Designation"
                    name="designation"
                    id="designation"
                    size="small"
                    fullWidth
                    variant="outlined"
                    value={formik.values.designation}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.designation &&
                      Boolean(formik.errors.designation)
                    }
                    helperText={
                      formik.touched.designation && formik.errors.designation
                    }
                  >
                    <MenuItem value="employee">Employee</MenuItem>
                    <MenuItem value="staf">Staff</MenuItem>
                    <MenuItem value="admin">Admin</MenuItem>
                  </TextField>
                  <TextField
                    label="Password"
                    id="password"
                    type="password"
                    name="password"
                    size="small"
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
                    size="small"
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

                  <FormControl
                    error={
                      formik.touched.images && Boolean(formik.errors.images)
                    }
                  >
                    <Typography variant="body1">
                      Upload your 5 photos
                    </Typography>
                    <input
                      type="file"
                      name="images"
                      accept="image/*"
                      size="small"
                      multiple
                      onBlur={formik.handleBlur}
                      onChange={(event) =>
                        handleFileChange(event, formik, setImageBase64Array)
                      }
                    />
                    {formik.touched.images && formik.errors.images && (
                      <Typography variant="body2" color="error">
                        {formik.errors.images}
                      </Typography>
                    )}
                  </FormControl>
                  <Box>
                    <Button
                      type="submit"
                      variant="contained"
                      size="small"
                      disabled={!formik.isValid || formik.isSubmitting}
                    >
                      Submit
                    </Button>
                    <Button onClick={onClose}>Cancel</Button>
                  </Box>
                </Stack>
              </Form>
            );
          }}
        </Formik>
      </Box>
    </Modal>
  );
}

NewUserModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  setImageBase64Array: PropTypes.func.isRequired,
};

export default NewUserModal;
