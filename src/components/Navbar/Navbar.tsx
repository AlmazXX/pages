import { useCallback, useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import axiosApi from "../../axiosApi";
import { capitalize } from "../../helpers";
import { PagesList } from "../../types";

const Navbar = () => {
  const { pathname } = useLocation();
  const [pageNames, setPageNames] = useState<string[]>([]);

  const getPageNames = useCallback(async () => {
      const { data } = await axiosApi.get<PagesList>(`/pages/.json`);
      const pages = Object.keys(data);
      setPageNames(pages);
  }, []);

  useEffect(() => {
    getPageNames().catch(console.error);
  }, [getPageNames, pathname]);

  return (
    <div className="navbar navbar-expand-sm navbar-dark bg-primary">
      <div className="container">
        <span className="navbar-brand">Pages</span>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav mr-auto">
            {pageNames.map((pageName) => (
              <li className="nav-item" key={pageName}>
                <NavLink to={`pages/${pageName}`} className="nav-link">
                  {capitalize(pageName)}
                </NavLink>
              </li>
            ))}
            <li className="nav-item">
              <NavLink to="/pages/admin" className="nav-link">
                Admin
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/pages/create" className="nav-link">
                Create page
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;