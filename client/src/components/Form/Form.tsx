import React, { useEffect, useState } from "react";
import useStyles from "./styles";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost } from "../../reducers/postReducer";
import { RootState } from "../../store";

type FormProps = {
  currentId: string;
  setCurrentId: React.Dispatch<any>;
};

const Form: React.FC<FormProps> = ({ currentId, setCurrentId }) => {
  const classes = useStyles();
  const [postData, setPostData] = useState<any>({
    _id: "",
    creator: "",
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });
  // dispatch CREATE Action.type
  const dispatch = useDispatch();
  const post = useSelector((state: RootState) =>
    currentId ? state.posts.data.find((post) => post._id === currentId) : null
  );
  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (currentId) {
      dispatch(updatePost(currentId, postData));
    } else {
      dispatch(createPost(postData));
    }
    clear();
  };
  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const clear = () => {
    setCurrentId(null);
    setPostData({
      _id: "",
      creator: "",
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    });
  };

  return (
    <Paper>
      <form
        autoComplete="off"
        method="POST"
        noValidate
        className={`${classes.root} ${classes.form}`}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">
          {currentId ? "Editing" : "Creating"} a memory
        </Typography>
        <TextField
          name="creator"
          variant="outlined"
          label="creator"
          fullWidth
          value={postData.creator}
          onChange={(e) => {
            setPostData({ ...postData, creator: e.target.value });
          }}
        />
        <TextField
          name="title"
          variant="outlined"
          label="title"
          fullWidth
          value={postData.title}
          onChange={(e) => {
            setPostData({ ...postData, title: e.target.value });
          }}
        />
        <TextField
          name="message"
          variant="outlined"
          label="message"
          fullWidth
          value={postData.message}
          onChange={(e) => {
            setPostData({ ...postData, message: e.target.value });
          }}
        />
        <TextField
          name="tags"
          variant="outlined"
          label="tags"
          fullWidth
          value={postData.tags}
          onChange={(e) => {
            setPostData({ ...postData, tags: e.target.value });
          }}
        />
        <div className={classes.fileInput}>
          <FileBase
            type="file"
            multiple={false}
            onDone={(base64: any) =>
              setPostData({ ...postData, selectedFile: base64.base64 })
            }
          />
        </div>
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
        >
          Submit
        </Button>
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="secondary"
          size="small"
          onClick={clear}
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};
export default Form;
