import React, { useState, useCallback } from "react";
import axios from "axios";

const CommentCreate = ({ postId }) => {
  const [content, setContent] = useState("");

  const handleContent = useCallback((e) => {
    setContent(e.target.value);
  });

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();

    await axios.post(`http://posts.com/posts/${postId}/comments`, {
      content,
    });

    setContent("");
  });

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>New Comment</label>
          <input
            value={content}
            onChange={handleContent}
            className="form-control"
          />
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default CommentCreate;
