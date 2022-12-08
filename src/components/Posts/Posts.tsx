import { FC } from "react";
import { IPost } from "../../types";
import PostItem from "./PostItem";

interface Props {
  posts: IPost[];
}

const Posts: FC<Props> = ({ posts }) => {
  return (
    <div className="col row mt-3 gap-3">
      {posts.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </div>
  );
};

export default Posts;