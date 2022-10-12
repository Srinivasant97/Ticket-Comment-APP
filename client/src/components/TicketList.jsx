import React from "react";
import Ticket from "./Ticket";
import { getAllTickets, postTicket } from "../services/ticketService";
import { useState, useEffect } from "react";

function TicketList() {
  const [ticket, setTicket] = useState([]);
  const [title, setTitle] = useState("");
  const [post, setPost] = useState("");

  useEffect(() => {
    getAllTickets().then((data) => {
      setTicket([...data]);
    });
  }, []);

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };
  const handlePost = (e) => {
    setPost(e.target.value);
  };

  const submitPost = async (e) => {
    e.preventDefault();
    const data = {
      title: title,
      body: post,
      user: localStorage.getItem("user"),
    };
    const response = await postTicket(data);
    setTicket([...ticket, response]);
    setTitle("");
    setPost("");
  };

  return (
    <div className="ticketList-container">
      <form onSubmit={submitPost}>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Write a Title..."
            aria-label="Recipient's username"
            aria-describedby="button-addon2"
            value={title}
            onChange={handleTitle}
          />
          <input
            type="text"
            className="form-control"
            placeholder="Write a Post..."
            aria-label="Recipient's username"
            aria-describedby="button-addon2"
            value={post}
            onChange={handlePost}
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
      {ticket.map((data, index) => {
        return <Ticket data={data} key={index} />;
      })}
    </div>
  );
}

export default TicketList;
