export const addComment = (comment) => {
  return {
    type: 'ADD_COMMENT',
    payload: {
      id: comment.id,
      text: comment.text,
      replies: comment.replies,
      created_at: comment.created_at,
    },
  };
};

export const addReply = (reply) => {
  return {
    type: 'ADD_REPLY',
    payload: {
      id: reply.id,
      text: reply.text,
      created_at: reply.created_at,
    },
    parentId: reply.parent_id,
  };
};
