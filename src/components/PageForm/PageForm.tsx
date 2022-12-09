import { ChangeEvent, FC, FormEvent, useEffect, useState } from "react";
import { capitalize, makeSlug } from "../../helpers";
import { Page, PagesList } from "../../types";

interface Props {
  existingHandles?: string[];
  existingPages?: PagesList;
  onSubmit: (name: string, page: Page) => void;
}

const PageForm: FC<Props> = ({ existingHandles, existingPages, onSubmit }) => {
  const [handle, setHandle] = useState<string>("");
  const [page, setPage] = useState<Page>({ title: "", content: "" });

  const onHandleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { value } = event.target;
    const correctedStr = makeSlug(value);
    setHandle(existingHandles ? value : correctedStr);
  };

  useEffect(() => {
    existingPages && existingPages[handle]
      ? setPage((prev) => ({ ...prev, ...existingPages[handle] }))
      : setPage({ title: "", content: "" });
  }, [existingPages, handle]);

  const onPageChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setPage((prev) => ({ ...prev, [name]: value }));
  };

  const onFormSumbit = (event: FormEvent) => {
    event.preventDefault();
    onSubmit(handle, page);
    setPage({
      title: "",
      content: "",
    });
  };

  const handleForm = existingHandles ? (
    <div className="form-group mb-2">
      <label htmlFor="handle">Handle</label>
      <select
        name="handle"
        id="handle"
        className="form-select"
        value={handle}
        onChange={onHandleChange}
        required
      >
        <option value="">Please select a page</option>
        {existingHandles.map((handle) => (
          <option key={handle} value={handle}>
            {capitalize(handle)}
          </option>
        ))}
      </select>
    </div>
  ) : (
    <div className="form-group mb-2">
      <label htmlFor="handle">Handle</label>
      <input
        type="text"
        name="handle"
        id="handle"
        className="form-control"
        value={handle}
        onChange={onHandleChange}
        required
      />
    </div>
  );

  return (
    <form onSubmit={onFormSumbit}>
      {handleForm}
      <div className="form-group mb-2">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          id="title"
          className="form-control"
          value={page.title}
          onChange={onPageChange}
          required
        />
      </div>
      <div className="form-group mb-3">
        <label htmlFor="content">Text</label>
        <textarea
          name="content"
          id="content"
          className="form-control"
          value={page.content}
          onChange={onPageChange}
          required
        />
      </div>
      <div className="d-flex gap-3 px-0 mb-3">
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </div>
    </form>
  );
};

export default PageForm;