import React, { useCallback, useState } from "react";
import axios from "axios";

const PostCreate = () => {
  const [title, setTitle] = useState("");

  const handleTitle = useCallback((e) => {
    setTitle(e.target.value);
  });

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();

    await axios.post("http://posts.com/posts/create", { title });

    setTitle("");
  });

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            value={title}
            onChange={handleTitle}
            className="form-control"
          />
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default PostCreate;
