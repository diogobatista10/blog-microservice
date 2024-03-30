import React from "react";

const Comment = ({ comment }) => {
  let content = comment.content;
  if (comment.status === "rejected") {
    content = "This comment has been rejected!";
  }

  if (comment.status === "pending") {
    content = "This comment is awaiting moderation!";
  }

  return <li key={comment.id}>{content}</li>;
};

const CommentList = ({ comments }) => {
  const renderedComments = Object.values(comments);

  return (
    <ul>
      {renderedComments?.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </ul>
  );
};

export default CommentList;
