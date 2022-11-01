import React, { useEffect } from "react";
import useStyles from "./styles";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@material-ui/core";
import { MoreHoriz, Delete, ThumbUpAlt } from "@material-ui/icons";
import moment from "moment";
import {
  deletePost,
  getPosts,
  Post,
  updatePostLikeCount,
} from "../../../reducers/postReducer";
import { useDispatch } from "react-redux";

type DefaultProps = {
  postData: Post;
  setCurrentId: React.Dispatch<any>;
};
const Post = ({ postData, setCurrentId }: DefaultProps) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deletePost(postData._id));
  };

  const handleUpdateLikeCount = () => {
    dispatch(updatePostLikeCount(postData._id));
  };

  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.media}
        image={
          postData.selectedFile ||
          "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
        }
        title={postData.title}
      />
      <div className={classes.overlay}>
        <Typography variant="h6">{postData.creator}</Typography>
        <Typography variant="body2">
          {moment(postData.createdAt).fromNow()}
        </Typography>
      </div>
      <div className={classes.overlay2}>
        <Button
          style={{ color: "white" }}
          size="small"
          onClick={() => {
            setCurrentId(postData._id);
          }}
        >
          <MoreHoriz fontSize="medium" />
        </Button>
      </div>
      <div className={classes.details}>
        <Typography variant="body2">
          {postData.tags !== undefined
            ? postData.tags.map((tag: any) => `#${tag} `)
            : ""}
        </Typography>
      </div>
      <div>
        <CardContent id="title_message_card">
          <Typography variant="h6">{postData.title}</Typography>
          <Typography variant="subtitle1">{postData.message}</Typography>
        </CardContent>
        <CardActions id="thumbUp" className={classes.cardActions}>
          <Button size="small" color="primary" onClick={handleUpdateLikeCount}>
            <ThumbUpAlt fontSize="small" />
            Like
            {postData.likeCount}
          </Button>
          <Button
            size="small"
            color="primary"
            onClick={() => {
              // setCurrentId(postData._id);
              handleDelete();
            }}
          >
            <Delete fontSize="small" />
            Delete
          </Button>
        </CardActions>
      </div>
    </Card>
  );
};
export default Post;
