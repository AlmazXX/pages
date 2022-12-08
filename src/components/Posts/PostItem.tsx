import { FC } from "react";
import { Link, useLocation } from "react-router-dom";
import { IPost } from "../../types";

interface Props {
  post: IPost;
}
const PostItem: FC<Props> = ({ post }) => {
  const location = useLocation();

  return (
    <div className="col-12">
      <div className="card">
        <div className="card-body">
          <p className="small float-sm-end m-0 text-muted">
            Created on:{" "}
            <span>
              {new Date(post.date).toLocaleString("en-en", {
                day: "numeric",
                month: "long",
                year: "numeric",
                hour: "numeric",
                minute: "numeric",
              })}
            </span>
          </p>
          <h5 className="card-title">{post.title}</h5>
          <p className="card-text">
            {post.body.length > 100
              ? post.body.slice(0, 100) + "..."
              : post.body}
          </p>
          <Link
            to={
              location.pathname === "/posts" ? `${post.id}` : `posts/${post.id}`
            }
            className="btn btn-primary"
          >
            Read more
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PostItem;