import mongoose from 'mongoose'

const postSchema = mongoose.Schema({
  title: {type: String, required: true},
  creator: {type: String, required: true},
  tags: {type: [String], required: false},
  selectedFile: {type: String},
  likeCount: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: new Date()
  }

},
  {timestamps: true},
)

const PostMessage = mongoose.model('PostMessage', postSchema);
export default PostMessage;