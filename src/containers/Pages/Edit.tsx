import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosApi from "../../axiosApi";
import PageForm from "../../components/PageForm/PageForm";
import Spinner from "../../components/Spinner/Spinner";
import { Page, PagesList } from "../../types";

const Edit = () => {
  const navigate = useNavigate();
  const [handles, setHandles] = useState<string[] | null>(null);
  const [pages, setPages] = useState<PagesList | null>(null);
  const [loading, setLoading] = useState(false);

  const getPages = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await axiosApi.get<PagesList>(`/pages.json`);
      if (!data) {
        setPages(null);
        setHandles(null);
        return;
      }
      const existingHandles = Object.keys(data);
      setHandles(existingHandles);
      setPages(data);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void getPages();
  }, [getPages]);

  const editPage = async (name: string, page: Page) => {
    try {
      setLoading(true);
      await axiosApi.put(`/pages/${name}.json`, page);
      navigate(`/pages/${name}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="row mt-3">
      <h4>Edit page</h4>
      <div className="col">
        {loading ? (
          <Spinner />
        ) : (
          pages && handles && (
            <PageForm
              existingHandles={handles}
              existingPages={pages}
              onSubmit={editPage}
            />
          )
        )}
      </div>
    </div>
  );
};

export default Edit;