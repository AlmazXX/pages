import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosApi from "../../axiosApi";
import { Page } from "../../types";

const Pages = () => {
  const { pageName } = useParams();
  const [page, setPage] = useState<Page | null>(null);

  const getPage = useCallback(async () => {
    const { data } = await axiosApi.get<Page>(`/pages/${pageName}.json`);
    setPage(data);
  }, [pageName]);

  useEffect(() => {
    getPage();
  }, [getPage]);

  return (
    <div className="row mt-3 text-center lh-lg">
      {page && (
        <div className="col">
          <h4>{page.title}</h4>
          <p>{page.content}</p>
        </div>
      )}
    </div>
  );
};

export default Pages;