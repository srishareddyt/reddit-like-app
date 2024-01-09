const initialState = {
  comments: [],
};

const commentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_COMMENT':
      return {
        ...state,
        comments: [...state.comments, action.payload],
      };

    case 'ADD_REPLY':
      const updatedComments = state.comments.map((comment) => {
        if (comment.id === action.payload.parentId) {
          return {
            ...comment,
            replies: [...comment.replies, action.payload],
          };
        } else {
          return comment;
        }
      });

      return {
        ...state,
        comments: updatedComments,
      };

    default:
      return state;
  }
};

export default commentsReducer;
