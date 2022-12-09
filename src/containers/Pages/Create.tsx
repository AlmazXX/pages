import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosApi from "../../axiosApi";
import PageForm from "../../components/PageForm/PageForm";
import Spinner from "../../components/Spinner/Spinner";
import { Page } from "../../types";

const Create = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const createPage = async (name: string, page: Page) => {
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
      <h4>Create page</h4>
      {loading ? <Spinner /> : <PageForm onSubmit={createPage} />}
    </div>
  );
};

export default Create;