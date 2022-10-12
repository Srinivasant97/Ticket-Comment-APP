import React from "react";
import Comment from "./Comment";

function CommentList(props) {
  const { commentdata } = props;

  return (
    <div className="comment-individual">
      <Comment commentdata={commentdata} updateChild={props.addChildComment} />
      {commentdata.children &&
        commentdata.children.map((child, index) => {
          return (
            <div key={index} className="comment-child">
              <Comment
                commentdata={child}
                key={index}
                updateChild={props.addChildComment}
              />
            </div>
          );
        })}
    </div>
  );
}

export default CommentList;
