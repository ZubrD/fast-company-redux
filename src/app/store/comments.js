import { createSlice } from "@reduxjs/toolkit";
import commentService from "../services/comment.service";

const commentsSlice = createSlice({
    name: "comments",
    initialState: {
        entities: null,
        isLoading: true,
        error: null
    },
    reducers: {
        commentsRequested: (state) => {
            state.isLoading = true;
        },
        commentsReceived: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
        },
        commentsRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        commentsUpdated: (state, action) => {
            state.entities = action.payload;
        }
    }
});

const { reducer: commentsReducer, actions } = commentsSlice;
const {
    commentsRequested,
    commentsReceived,
    commentsRequestFailed,
    commentsUpdated
} = actions;

export const loadCommentsList = (userId) => async (dispatch) => {
    dispatch(commentsRequested());
    try {
        const { content } = await commentService.getComments(userId);
        dispatch(commentsReceived(content));
    } catch (error) {
        dispatch(commentsRequestFailed(error.message));
    }
};

export const createComment = (comment) => async (dispatch, getState) => {
    const commentsList = getState().comments.entities;
    const commentsListUpdated = [...commentsList];
    try {
        const { content } = await commentService.createComment(comment);
        commentsListUpdated.push(content);
        dispatch(commentsUpdated(commentsListUpdated));
    } catch (error) {
        console.log(error);
    }
};

export const removeComment = (id) => async (dispatch, getState) => {
    const commentsList = getState().comments.entities;
    const commentsForUpdate = [...commentsList];
    const commentsUpdatedList = commentsForUpdate.filter(
        (comment) => comment._id !== id
    );
    try {
        const { content } = await commentService.removeComment(id);
        console.log(content);
        dispatch(commentsUpdated(commentsUpdatedList));
    } catch (error) {
        console.log(error);
    }
};

export const getComments = () => (state) => state.comments.entities;
export const getCommentsLoadingStatus = () => (state) =>
    state.comments.isLoading;

export default commentsReducer;
