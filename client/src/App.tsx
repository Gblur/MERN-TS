// Components
import React, { useEffect, useState } from "react";
import { Container, Typography, Grow, Grid } from "@material-ui/core";
import { useDispatch } from "react-redux";
import memories from "./images/memories.png";

// Custom Components
import Posts from "./components/Posts/Posts";
import Form from "./components/Form/Form";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// Actions
import { getPosts } from "./reducers/postReducer";
import Navbar from "./components/Navbar/Navbar";
import Auth from "./components/Auth/Auth";
import { GoogleOAuthProvider } from "@react-oauth/google";

function App() {
  const [currentId, setCurrentId] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);

  return (
    // <React.StrictMode>
    <GoogleOAuthProvider
      clientId={`${process.env.PUBLIC_GOOGLE_OAUTH_CLIENT_ID}`}
    >
      <BrowserRouter>
        <Container maxWidth="lg" fixed>
          <Navbar />
          <Routes>
            <Route
              path="/"
              element={
                <Grow in>
                  <Container>
                    <Grid
                      container
                      justifyContent="space-between"
                      alignItems="stretch"
                      spacing={2}
                    >
                      <Grid item xs={12} sm={7}>
                        <Posts setCurrentId={setCurrentId} />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <Form
                          currentId={currentId}
                          setCurrentId={setCurrentId}
                        />
                      </Grid>
                    </Grid>
                  </Container>
                </Grow>
              }
            />
            <Route path="/auth" element={<Auth />}></Route>
          </Routes>
        </Container>
      </BrowserRouter>
    </GoogleOAuthProvider>
    // </React.StrictMode>
  );
}

export default App;
