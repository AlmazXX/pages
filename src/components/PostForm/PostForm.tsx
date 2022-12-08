import { ChangeEvent, FC, FormEvent, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { IPostApi } from "../../types";

interface Props {
  onSubmit: (post: IPostApi) => void;
  existingPost?: IPostApi;
}

const PostForm: FC<Props> = ({ existingPost, onSubmit }) => {
  const { id } = useParams();
  const [post, setPost] = useState<IPostApi>(
    existingPost || { title: "", body: "", date: "" }
  );

  const onPostChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setPost((prev) => ({
      ...prev,
      [name]: value,
      date: new Date().toISOString(),
    }));
  };

  const onFormSubmit = (event: FormEvent) => {
    event.preventDefault();
    onSubmit(post);
    setPost((prev) => ({ ...prev, title: "", body: "", date: "" }));
  };

  return (
    <form className="p-0" onSubmit={onFormSubmit}>
      <div className="form-group mb-2">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          id="title"
          className="form-control"
          value={post.title}
          onChange={onPostChange}
        />
      </div>
      <div className="form-group mb-3">
        <label htmlFor="body">Text</label>
        <textarea
          name="body"
          id="body"
          className="form-control"
          value={post.body}
          onChange={onPostChange}
        />
      </div>
      <div className="d-flex gap-3 px-0 mb-3">
        <button type="submit" className="btn btn-primary">
          {existingPost ? "Update" : "Post"}
        </button>
        <Link className="btn btn-warning" to={id ? `/posts/${id}` : "/"}>
          Cancel
        </Link>
      </div>
    </form>
  );
};

export default PostForm;