import mongoose from "mongoose";
import PostMessage from "../models/post-model.js"


export const getPostMessages = async (req, res) => {
  try {
    const postMessages = await PostMessage.find();
            
    res.status(200).json(postMessages);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export const createPostMessage = async (req, res) => {
  const { title, message, selectedFile, creator, tags } = req.body;

  const newPostMessage = new PostMessage({ title, message, selectedFile, creator, tags })

  try {
      await newPostMessage.save();

      res.status(201).json(newPostMessage );
  } catch (error) {
      res.status(409).json({ message: error });
  }
}

export const updatePostMessage = async (req, res) => {
  const { id } = req.params;
  const { title, message, creator, selectedFile, tags } = req.body;

  if(!mongoose.Types.ObjectId.isValid(id)) return res.status(400).send(`No post with id: #{id}`)

  const updatedPost = {title, message, creator , selectedFile, tags, _id: id};

  await PostMessage.findByIdAndUpdate(id, updatedPost, {new: true})
  res.json(updatedPost)

    
    
}

export const deletePostMessage = async (req, res) => {
  const { id } = req.params;
  if(!mongoose.Types.ObjectId.isValid(id)) return res.status(400).send(`No post with id: #{id}`)
  await PostMessage.findByIdAndDelete(id)
  res.json({message: 'Post deleted successfully'})
}

export const getPostMessageById = async (req, res) => {
  await PostMessage.findOne({ _id: req.params.id }, (err, post) => {
      if (err) {
          return res.status(400).json({ success: false, error: err })
      }

      if (!post) {
          return res
              .status(404)
              .json({ success: false, error: `PostMessage not found` })
      }
      return res.status(200).json({ success: true, data: post })
  }).catch(err => console.log(err))
}



