import React from "react";
import { Link } from "react-router-dom";
import Menu from "./Menu";
import Search from "./Search";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../redux/actions/postAction";
import { getSuggestions } from "../../redux/actions/suggestionsAction";
import Logo from "../Logo";

const Header = () => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleRefreshHome = () => {
    window.scrollTo({ top: 0 });
    dispatch(getPosts(auth.token));
    dispatch(getSuggestions(auth.token));
  };

  return (
    <div className="header">
      <nav className="navbar navbar-expand-lg justify-content-between header-inner">
        <div className="container-fluid">
          <Link
            to="/"
            className="logo"
            onClick={handleRefreshHome}
            aria-label="Face Meet home"
          >
            <Logo size="sm" />
          </Link>

          <Search />

          <Menu />
        </div>
      </nav>
    </div>
  );
};

export default Header;
