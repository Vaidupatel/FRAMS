import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import propTypes from "prop-types";
import { Link } from "react-router-dom";
function Hero(props) {
  const extraPath = `/${props.extraPath}`;
  const nextPath = `/${props.nextPath}`;
  return (
    <Box width="60vw" component="div" margin="auto" padding="50px">
      <Card elevation={20} sx={{ p: 3 }}>
        <CardContent>
          <Typography variant="h2" align="center" component="div">
            {props.heading}
          </Typography>
          <Typography
            variant="subtitle1"
            align="center"
            component="div"
            color="text.secondary"
          >
            {props.subtitle}
          </Typography>
          <Typography variant="body1" fontSize={"1.2rem"} component="div">
            {props.content}
          </Typography>
        </CardContent>
        <CardActions>
          <Button component={Link} to={extraPath} sx={{fontSize:"1.3rem"}}>
            {props.extraTxt}
          </Button>
          <Button component={Link} to={nextPath} sx={{fontSize:"1.3rem"}}>
            {props.nextTxt}
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
}

export default Hero;
Hero.propTypes = {
  heading: propTypes.string.isRequired,
  subtitle: propTypes.string.isRequired,
  content: propTypes.string.isRequired,
  nextPath: propTypes.string.isRequired,
  extraPath: propTypes.string.isRequired,
  extraTxt: propTypes.string.isRequired,
  nextTxt: propTypes.string.isRequired,
};
Hero.defaultProps = {
  heading: "Welcome to FRAMS",
  subtitle: "Facial Recongnication based Attendance Management System",
  content: "",
  nextPath: "",
  extraPath: "",
  extraTxt: "",
  nextTxt: "",
};
