import {
  Avatar,
  Button,
  Container,
  Grid,
  Paper,
  Typography,
} from "@material-ui/core";
import useStyles from "../../styles";
import React, { useState } from "react";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Input from "../TextField/Input";
import {
  GoogleCredentialResponse,
  GoogleLogin,
  googleLogout,
} from "@react-oauth/google";
import Icon from "./Icon";
import jwtDecode from "jwt-decode";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

type Props = Record<string, unknown>;

export default function Auth({}: Props) {
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignup] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = () => {};
  const handleChange = () => {};
  const handleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };
  const handleSwitchSignState = () => {
    setIsSignup((prevState) => !prevState);
    setShowPassword(false);
  };

  const googleSuccess = async (res: any) => {
    const result = await res?.credential;
    const decoded: { name: string; picture: string; sub: string } =
      jwtDecode(result);
    const { name, picture, sub } = decoded;

    try {
      dispatch({ type: "AUTH", authData: { name, picture, sub } });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const googleFailure = () => {
    console.log("Nope. Login not successful");
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h6">{isSignUp ? "Sign Up" : "Sign In"}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignUp && (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  half
                  type="text"
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  half
                  type="text"
                />
              </>
            )}
            <Input
              name="email"
              label="Email"
              handleChange={handleChange}
              half
              type="email"
            />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              half
              type={showPassword ? "password" : "text"}
              handleShowPassword={handleShowPassword}
            />
            {isSignUp && (
              <Input
                name="repeatpassword"
                label="repeat password"
                handleChange={handleChange}
                half
                type="password"
                handleShowPassword={handleShowPassword}
              />
            )}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {isSignUp ? "Sign Up" : "Sign In"}
          </Button>
          <GoogleLogin onSuccess={googleSuccess} onError={googleFailure} />
          <Grid container justifyContent="flex-end">
            <Grid>
              <Button onClick={handleSwitchSignState}>
                {isSignUp
                  ? "Already have an account? Sign In"
                  : "Dont have an account? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
}
