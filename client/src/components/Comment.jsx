import React from "react";
import { useState } from "react";
import { HiOutlineUser } from "react-icons/hi";
import { MdReply } from "react-icons/md";
import { postCommentToDb } from "../services/ticketService";
import { useParams } from "react-router-dom";

function Comment(props) {
  const { commentdata } = props;
  const { id } = useParams();
  const [editing, setEditing] = useState(false);
  const [comment, setComment] = useState("");

  const handleComment = () => {
    setEditing(true);
  };
  const handleWriteComment = (e) => {
    setComment(e.target.value);
  };

  const postComment = async (e) => {
    e.preventDefault();
    const data = {
      body: comment,
      user: localStorage.getItem("user"),
      parent: commentdata.id,
    };
    const response = await postCommentToDb(id, data);
    props.updateChild(response);
    setComment("");
  };
  return (
    <div className="mb-4">
      <div className="comments-title">
        <div className="title-left">
          <HiOutlineUser />
          <div className="ticket-created">{commentdata.createdBy}</div>
        </div>

        <div className="comments-createdtime">{commentdata.updatedAt}</div>
      </div>
      <div className="comments-body">{commentdata.body}</div>
      <div className="comments-tools">
        {!commentdata.parentId && !editing && (
          <div onClick={handleComment}>
            <MdReply />
          </div>
        )}

        {editing && (
          <form onSubmit={postComment}>
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Write a Comment..."
                aria-label="Recipient's username"
                aria-describedby="button-addon2"
                value={comment}
                onChange={handleWriteComment}
              />
              <button
                className="btn btn-outline-primary"
                type="submit"
                id="button-addon2"
              >
                Post
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default Comment;
