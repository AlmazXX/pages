import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosApi from "../../axiosApi";
import PostForm from "../../components/PostForm/PostForm";
import Spinner from "../../components/Spinner/Spinner";
import { IPostApi } from "../../types";

const Add = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const createPost = async (post: IPostApi) => {
    try {
      setLoading(true);
      await axiosApi.post("/posts.json", post);
      navigate("/");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="row mt-3">
      <h4>Add new post</h4>
      <div className="col-6">
        {loading ? <Spinner /> : <PostForm onSubmit={createPost} />}
      </div>
    </div>
  );
};

export default Add;