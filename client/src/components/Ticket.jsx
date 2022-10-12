import React from "react";
import { HiOutlineUser } from "react-icons/hi";
import { Link } from "react-router-dom";

function Ticket(props) {
  const { data } = props;
  return (
    <div className="ticket-box">
      <div className="ticket-title">
        <div className="title-left">
          <HiOutlineUser />
          <div className="ticket-created">{data.createdBy}</div>
        </div>

        <div>{data.createdAt}</div>
      </div>
      <Link to={`/ticket/${data.id}`}>
        <h3>{data.title}</h3>
      </Link>
      <div>{data.body}</div>
    </div>
  );
}

export default Ticket;
