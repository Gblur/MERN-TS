import React, { useEffect, useState } from "react";
import { AppBar, Avatar, Button, Toolbar, Typography } from "@material-ui/core";
import memories from "../../images/memories.png";

import useStyles from "./NavbarStyles";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { googleLogout } from "@react-oauth/google";
import { useLocation } from "react-router-dom";

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = {};

type userSchema = {
  name: string;
  picture: string;
  sub: string;
} | null;

export default function Navbar({}: Props) {
  const PROFILE = JSON.parse(localStorage.getItem("profile"));
  const classes = useStyles();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // triggers rerender after dispatch
  const profile = useSelector(
    (state: RootState) => state.authReducer?.authData
  );
  const [user, setUser] = useState<userSchema>(PROFILE);

  const logout = () => {
    dispatch({ type: "LOGOUT", authData: {} });
    navigate("/");
  };

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  const NotLoggedIn = () => (
    <>
      {!user && (
        <Button component={Link} to="/auth" variant="contained" color="primary">
          Sign in
        </Button>
      )}
    </>
  );

  const LoggedIn = () => {
    return (
      <>
        {user && (
          <div>
            <Avatar alt={user?.name} src={user?.picture}>
              {user?.name?.charAt(0)}
            </Avatar>
            <Typography variant="h6">{user?.name}</Typography>
            <Button variant="contained" color="secondary" onClick={logout}>
              Logout
            </Button>
          </div>
        )}
      </>
    );
  };

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <div>
        <Typography
          component={Link}
          to={"/"}
          className={classes.heading}
          variant="h2"
          align="center"
        >
          Memories
        </Typography>
        <img
          className={classes.image}
          src={memories}
          alt="memories"
          height="60"
        />
      </div>
      <Toolbar>
        <NotLoggedIn />
        <LoggedIn />
      </Toolbar>
    </AppBar>
  );
}
