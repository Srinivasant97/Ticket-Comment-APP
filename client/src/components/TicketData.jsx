import React from "react";
import { HiOutlineUser } from "react-icons/hi";
import CommentList from "./CommentList";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getTicketById } from "../services/ticketService";
import { postCommentToDb } from "../services/ticketService";

function TicketData() {
  const { id } = useParams();
  const [ticketDatas, setTicketDatas] = useState({});
  const [comment, setComment] = useState("");

  useEffect(() => {
    getTicketById(id).then((data) => {
      setTicketDatas(data);
    });
  }, []);

  const handleComment = (e) => {
    setComment(e.target.value);
  };

  const postComment = async (e) => {
    e.preventDefault();
    const data = {
      body: comment,
      user: localStorage.getItem("user"),
      parent: null,
    };
    const response = await postCommentToDb(id, data);
    setComment("");
    const comments = [response, ...ticketDatas.comments];
    // console.log({ ...ticketDatas, comments: "comments" });
    setTicketDatas({ ...ticketDatas, comments: comments });
    //console.log(ticketDatas);
  };

  const addChildComment = (data) => {
    const comments = ticketDatas.comments.map((comment) => {
      if (comment.id === data.parentId) {
        const child = [...comment.children, data];
        return { ...comment, children: child };
      }
      return comment;
    });

    setTicketDatas({ ...ticketDatas, comments: comments });
  };

  return (
    <div className="ticket-data">
      <div className="mb-4">
        <div className="ticket-title">
          <div className="title-left">
            <HiOutlineUser />
            <div className="ticket-created">{ticketDatas?.createdBy}</div>
          </div>

          <div>{ticketDatas?.createdAt}</div>
        </div>
        <h3>{ticketDatas?.title}</h3>
        <div>{ticketDatas?.body}</div>
      </div>
      <form onSubmit={postComment}>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Write a Comment..."
            aria-label="Recipient's username"
            aria-describedby="button-addon2"
            value={comment}
            onChange={handleComment}
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
      <div className="ticket-comments">
        <h2>Comments</h2>
        <div>
          {ticketDatas?.comments?.map((commentdata, index) => {
            return (
              <CommentList
                key={index}
                commentdata={commentdata}
                addChildComment={addChildComment}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default TicketData;
