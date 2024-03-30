const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");
const cors = require("cors");
const { default: axios } = require("axios");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const commentsByPostId = {};

app.get("/posts/:id/comments", (req, res) => {
  const { id } = req.params;
  res.send(commentsByPostId[id] || []);
});

app.post("/posts/:id/comments", async (req, res) => {
  const cid = randomBytes(4).toString("hex");
  const { content } = req.body;
  const { id } = req.params;

  const comments = commentsByPostId[id] || [];
  comments.push({ id: cid, content, status: "pending" });

  commentsByPostId[id] = comments;

  await axios.post("http://event-bus-srv:4005/events", {
    type: "CommentCreated",
    data: { id: cid, content, postId: id, status: "pending" },
  });

  res.status(201).send(commentsByPostId[id]);
});

app.post("/events", async (req, res) => {
  const { type, data } = req.body;
  console.log("received event", type);

  if (type === "CommentModerated") {
    const { postId, id, status, content } = data;

    const comments = commentsByPostId[postId];
    const comment = comments.find((comment) => comment.id === id);
    comment.status = status;

    await axios.post("http://event-bus-srv:4005/events", {
      type: "CommentUpdated",
      data: {
        id,
        postId,
        status,
        content: content,
      },
    });
  }

  res.send({});
});

app.listen(4001, () => {
  console.log("listening on 4001!");
});
