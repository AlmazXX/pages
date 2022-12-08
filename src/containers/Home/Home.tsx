import { useCallback, useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import axiosApi from "../../axiosApi";
import Posts from "../../components/Posts/Posts";
import Spinner from "../../components/Spinner/Spinner";
import { IPost, IPostsList } from "../../types";

const Home = () => {
  const location = useLocation();
  const [posts, setPosts] = useState<IPost[]>([]);
  const [loading, setLoading] = useState(false);

  const getPosts = useCallback(async () => {
    try {
      setLoading(true);
      const postsResponse = await axiosApi.get<IPostsList>("/posts.json");

      if (!postsResponse.data) return setPosts([]);

      const posts = Object.keys(postsResponse.data)
        .map((key) => ({
          ...postsResponse.data[key],
          id: key,
        }))
        .sort((a, b) => (b.date > a.date ? 1 : -1));
      setPosts(posts);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
      void getPosts();
  }, [getPosts, location]);

  return (
    <div className="mt-3">
      <h4>My Blog</h4>
      <div className="row gap-5 align-items-start">
      {loading ? (
        <Spinner />
      ) : posts.length ? (
        <Posts posts={posts} />
      ) : (
        <p>There's no posts</p>
      )}
      <Outlet/>
      </div>
    </div>
  );
};

export default Home;