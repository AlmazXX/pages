import { useCallback, useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import axiosApi from "../../axiosApi";
import Post from "../../components/Post/Post";
import Spinner from "../../components/Spinner/Spinner";
import { IPostApi } from "../../types";

const PostPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const [post, setPost] = useState<IPostApi | null>(null);
  const [loading, setLoading] = useState(false);

  const getOnePost = useCallback(async () => {
    try {
      setLoading(true);
      const postResponse = await axiosApi.get<IPostApi>(`/posts/${id}.json`);
      setPost(postResponse.data);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    getOnePost().catch(console.error);
  }, [getOnePost, location]);

  const deleteOnePost = async () => {
    try {
      setLoading(true);
      await axiosApi.delete(`/posts/${id}.json`);
      navigate("/");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="col row mt-3">
      {loading ? (
        <Spinner />
      ) : (
        post && <Post post={post} onDelete={deleteOnePost} />
      )}
      <Outlet />
    </div>
  );
};

export default PostPage;