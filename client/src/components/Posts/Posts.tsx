import React from "react";
import Post from "./Post/Post";
import useStyles from "./styles";
import { useSelector } from "react-redux";
import { CircularProgress, Grid } from "@material-ui/core";
import { RootState } from "../../store";
// import { Post } from "../../types/post";

interface DefaultProps {
  setCurrentId: any;
}

const Posts: React.FC<DefaultProps> = ({ setCurrentId }) => {
  const classes = useStyles();
  // const TypedSelector: TypedUseSelectorHook<RootState> = useSelector;
  // const posts = TypedSelector((state) => state.posts);
  const posts = useSelector((state: RootState) => state.posts.data);
  const isLoading = useSelector((state: RootState) => state.posts.isLoading);

  console.log(isLoading);

  return isLoading ? (
    <CircularProgress />
  ) : (
    <Grid
      className={classes.mainContainer}
      container
      alignItems="stretch"
      spacing={3}
    >
      {posts.map((post) => (
        <Grid key={post._id} item xs={12} sm={6}>
          <Post setCurrentId={setCurrentId} postData={post} />
        </Grid>
      ))}
    </Grid>
  );
};
export default Posts;
