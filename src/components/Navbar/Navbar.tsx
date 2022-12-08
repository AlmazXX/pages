import { useCallback, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axiosApi from "../../axiosApi";
import { PagesList } from "../../types";

const Navbar = () => {
  const [pageNames, setPageNames] = useState<string[]>([]);

  const getPageNames = useCallback(async () => {
    const { data } = await axiosApi.get<PagesList>(`/pages/.json`);
    const pages = Object.keys(data);
    setPageNames(pages);
  }, []);

  useEffect(() => {
    getPageNames();
  }, [getPageNames]);

  return (
    <div className="navbar navbar-expand-sm navbar-dark bg-primary">
      <div className="container">
        <span className="navbar-brand">Blog</span>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <NavLink to="/" className="nav-link">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/new-post" className="nav-link">
                Add
              </NavLink>
            </li>
            {pageNames.map((pageName) => (
              <li className="nav-item" key={pageName} >
                <NavLink to={`pages/${pageName}`}className="nav-link">
                  {pageName[0].toUpperCase() + pageName.slice(1)}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;