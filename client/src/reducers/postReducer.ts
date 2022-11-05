import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import * as api from "../api";

export type Post = typeof post;
export const post = {
  _id: 0,
  creator: "",
  title: "",
  message: "",
  tags: [""],
  selectedFile: "",
  likeCount: 0,
  createdAt: new Date().toString(),
};

interface InitialState {
  data: Post[];
  isLoading: boolean;
  error: null | Error;
}
const initialState: InitialState = {
  data: [],
  isLoading: true,
  error: null,
};

// Promise Actions
const POSTS_FETCH_ALL_PENDING_ACTION = "POSTS/FETCH_ALL/pending";
const POSTS_FETCH_ALL_FULFILLED_ACTION = "POSTS/FETCH_ALL/fulfilled";
const POSTS_FETCH_ALL_REJECTED_ACTION = "POSTS/FETCH_ALL/rejected";

// CRUD Actions
const POSTS_CREATE_ACTION = "POSTS/CREATE";
const POSTS_UPDATE_ACTION = "POSTS/UPDATE";
const POSTS_DELETE_ACTION = "POSTS/DELETE";
const POSTS_UPDATE_LIKE_ACTION = "POSTS/UPDATE/LIKE";

// Interfaces
interface fetchAction
  extends Action<
    | typeof POSTS_FETCH_ALL_FULFILLED_ACTION
    | typeof POSTS_FETCH_ALL_PENDING_ACTION
    | typeof POSTS_FETCH_ALL_REJECTED_ACTION
  > {
  payload: Post[];
}

interface createAction extends Action<typeof POSTS_CREATE_ACTION> {
  payload: Post;
}

interface updateAction extends Action<typeof POSTS_UPDATE_ACTION> {
  payload: Post;
}

interface deleteAction extends Action<typeof POSTS_DELETE_ACTION> {
  payload: number;
}
interface updateLikeAction extends Action<typeof POSTS_UPDATE_LIKE_ACTION> {
  payload: Post;
}

POSTS_UPDATE_LIKE_ACTION;

// Action types
const postsFetchAllPending = () => ({
  type: POSTS_FETCH_ALL_PENDING_ACTION,
});
const postsFetchAllRejected = (error: any) => ({
  type: POSTS_FETCH_ALL_REJECTED_ACTION,
  payload: error,
});
const postsFetchAllFulfilled = (data: Post[]) => ({
  type: POSTS_FETCH_ALL_FULFILLED_ACTION,
  payload: data,
});

const postCreate = (data: Post[]) => ({
  type: POSTS_CREATE_ACTION,
  payload: data,
});

const postUpdate = (data: Post[]) => ({
  type: POSTS_UPDATE_ACTION,
  payload: data,
});

const postDelete = (data: string) => ({
  type: POSTS_DELETE_ACTION,
  payload: data,
});

// api.getAllPosts();
// Action Creators
export const getPosts =
  (): ThunkAction<Promise<void>, InitialState, undefined, fetchAction> =>
  async (dispatch: any) => {
    dispatch(postsFetchAllPending());
    try {
      const { data } = await api.getAllPosts();
      dispatch(postsFetchAllFulfilled(data));
    } catch (error) {
      postsFetchAllRejected(error);
    }
  };

// api.getAllPosts();
export const createPost = (
  post: any
): ThunkAction<Promise<void>, InitialState, undefined, createAction> => {
  return async (dispatch: any) => {
    try {
      const { data } = await api.createPosts(post);
      dispatch(postCreate(data));
    } catch (error) {
      console.log(error);
    }
  };
};

// api.updatePostByID();
export const updatePost = (
  id: any,
  post: any
): ThunkAction<Promise<void>, InitialState, undefined, updateAction> => {
  return async (dispatch: any) => {
    try {
      const { data } = await api.updatePostById(id, post);
      dispatch(postUpdate(data));
    } catch (error) {
      console.log(error);
    }
  };
};

// Action to call by event
export const updatePostLikeCount = (
  id: any
): ThunkAction<Promise<void>, InitialState, undefined, updateLikeAction> => {
  return async (dispatch: any) => {
    try {
      const { data } = await api.updatePostLikeCount(id);
      dispatch(postUpdate(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const deletePost = (
  id: any
): ThunkAction<Promise<void>, InitialState, undefined, deleteAction> => {
  return async (dispatch: any) => {
    try {
      await api.deletePostById(id);
      dispatch(postDelete(id));
    } catch (error) {
      console.log(error);
    }
  };
};

export default (
  state = JSON.parse(JSON.stringify(initialState)) as InitialState,
  action:
    | fetchAction
    | createAction
    | updateAction
    | deleteAction
    | updateLikeAction
): InitialState => {
  switch (action.type) {
    case POSTS_FETCH_ALL_PENDING_ACTION:
      return {
        ...state,
        isLoading: true,
      };
    case POSTS_FETCH_ALL_REJECTED_ACTION:
      return {
        ...state,
        error: state.error,
        isLoading: false,
      };
    case POSTS_FETCH_ALL_FULFILLED_ACTION:
      return {
        ...state,
        data: action.payload,
        isLoading: false,
      };

    case POSTS_CREATE_ACTION:
      return {
        data: [...state.data, action.payload],
        isLoading: false,
        error: state.error,
      };
    case POSTS_UPDATE_ACTION:
    case POSTS_UPDATE_LIKE_ACTION:
      return {
        data: state.data.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
        isLoading: false,
        error: state.error,
      };
    case POSTS_DELETE_ACTION:
      return {
        data: state.data.filter((p: Post) => p._id !== action.payload),
        isLoading: false,
        error: state.error,
      };

    default:
      return state;
  }
};
