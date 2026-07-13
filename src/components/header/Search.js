import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { globalSearch } from "../../redux/actions/platformAction";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";
// import { Link } from "react-router-dom";
import UserCard from "../UserCard";
import Loader from "../UI/Loader";

const Search = () => {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);

  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [load, setLoad] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!search) return;

    try {
      setLoad(true);
      const data = await dispatch(globalSearch(auth.token, search));
      setUsers(data.users || []);
      setPosts(data.posts || []);
      setLoad(false);
    } catch (err) {
      setLoad(false);
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: err.response.data.msg },
      });
    }
  };

  const handleClose = () => {
    setSearch("");
    setUsers([]);
    setPosts([]);
  };

  return (
    <form className="search_form" onSubmit={handleSearch}>
      <input
        type="text"
        title="Search by username"
        name="search"
        value={search}
        id="search"
        placeholder="Search users & posts…"
        autoComplete="off"
        onChange={(e) =>
          setSearch(e.target.value.toLowerCase().replace(/ /g, " "))
        }
      />
      <div
        className="search_icon"
        style={{ opacity: search ? 0 : 0.4 }}
        aria-hidden
      >
        <span className="material-icons">search</span>
      </div>

      <div
        onClick={handleClose}
        className="close_search"
        style={{ opacity: users.length === 0 && posts.length === 0 ? 0 : 1 }}
      >
        &times;
      </div>

      <button type="submit" style={{ display: "none" }}>
        Search
      </button>

      {load && (
        <div className="fm-search-loader" aria-hidden>
          <Loader size="sm" />
        </div>
      )}

      <div className="users">
        {search &&
          users.map((user) => (
            <UserCard
              key={user._id}
              user={user}
              border="border"
              handleClose={handleClose}
            />
          ))}
        {search &&
          posts.map((post) => (
            <Link
              key={post._id}
              to={`/post/${post._id}`}
              className="search_post_hit"
              onClick={handleClose}
            >
              {post.content?.slice(0, 60) || "Post"} — @{post.user?.username}
            </Link>
          ))}
      </div>
    </form>
  );
};

export default Search;
