import { useCallback, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import axiosApi from "../../axiosApi";
import Spinner from "../../components/Spinner/Spinner";
import { Page } from "../../types";

const Pages = () => {
  const { pathname } = useLocation();
  const { pageName } = useParams();
  const [page, setPage] = useState<Page | null>(null);
  const [loading, setLoading] = useState(false);

  const getPage = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await axiosApi.get<Page>(`/pages/${pageName}.json`);
      setPage(data);
    } finally {
      setLoading(false);
    }
  }, [pageName]);

  useEffect(() => {
    void getPage();
  }, [getPage, pathname]);

  return (
    <div className="row mt-3 text-center lh-lg">
      {loading ? (
        <Spinner />
      ) : page ? (
        <div className="col">
          <h4>{page.title}</h4>
          <p>{page.content}</p>
        </div>
      ) : (
        <div className="col">
          <h4>Page is empty</h4>
        </div>
      )}
    </div>
  );
};

export default Pages;