import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosApi from "../../axiosApi";
import PostForm from "../../components/PostForm/PostForm";
import Spinner from "../../components/Spinner/Spinner";
import { IPostApi } from "../../types";

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState<IPostApi | null>(null);

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
  }, [getOnePost]);

  const updateOnePost = async (post: IPostApi) => {
    try {
      setLoading(true);
      await axiosApi.put(`/posts/${id}.json`, post);
      navigate(`/posts/${id}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h5 className="p-0">Edit post</h5>
      {loading ? (
        <Spinner />
      ) : (
        post && <PostForm existingPost={post} onSubmit={updateOnePost} />
      )}
    </>
  );
};

export default EditPost;