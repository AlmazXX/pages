import { FC, MouseEventHandler } from "react";
import { Link } from "react-router-dom";
import { IPostApi } from "../../types";

interface Props {
  post: IPostApi;
  onDelete: MouseEventHandler;
}

const Post: FC<Props> = ({ post, onDelete }) => {
  return (
    <>
      <h4>{post.title}</h4>
      <p className="small">
        Created on:{" "}
        <span>
          {new Date(post.date).toLocaleString("en-en", {
            day: "numeric",
            month: "long",
            year: "numeric",
            hour: 'numeric',
            minute: 'numeric',
          })}
        </span>
      </p>
      <p className="bg-light rounded-3 p-3 lh-lg">{post.body}</p>
      <div className="d-flex gap-3 px-0 mb-3">
        <Link to={`edit`} className="btn btn-primary">
          Edit post
        </Link>
        <button className="btn btn-danger" onClick={onDelete}>
          Delete post
        </button>
        <Link className="btn btn-warning" to="/">
          Cancel
        </Link>
      </div>
    </>
  );
};

export default Post;