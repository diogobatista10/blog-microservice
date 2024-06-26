import React, { useEffect, useState } from "react";
import axios from "axios";
import CommentCreate from "./CommentCreate";
import CommentList from "./CommentList";

const PostList = () => {
  const [posts, setPosts] = useState({});

  useEffect(() => {
    const getPosts = async () => {
      const res = await axios.get("http://posts.com/posts");

      setPosts(res.data);
    };

    getPosts();
  }, []);

  const renderedPosts = Object.values(posts);

  return (
    <div className="d-flex flex-row flex-wrap justify-content-between">
      {renderedPosts.map((post) => (
        <div
          className="card"
          style={{ width: "30%", marginBottom: "20px" }}
          key={post.id}
        >
          <div className="card-body">
            <h3> {post.title}</h3>
            <CommentList comments={post.comments} />
            <CommentCreate postId={post.id} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostList;
