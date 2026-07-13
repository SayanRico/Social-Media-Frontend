import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";
import { addUser, getConversations } from "../../redux/actions/messageAction";
import { getDataAPI } from "../../utils/fetchData";
import ChatContactItem from "./ChatContactItem";

const LeftSide = () => {
  const { auth, message } = useSelector((state) => state);
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  const pageEnd = useRef();
  const [page, setPage] = useState(0);

  const [search, setSearch] = useState("");
  const [searchUsers, setSearchUsers] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!search) return setSearchUsers([]);

    try {
      const res = await getDataAPI(`search?username=${search}`, auth.token);
      setSearchUsers(res.data.users);
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: err.response?.data?.msg || err.message },
      });
    }
  };

  const handleAddUser = (user) => {
    setSearch("");
    setSearchUsers([]);
    dispatch(addUser({ user, message }));
    return history.push(`/message/${user._id}`);
  };

  useEffect(() => {
    if (message.firstLoad) return;
    dispatch(getConversations({ auth }));
  }, [dispatch, auth, message.firstLoad]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPage((p) => p + 1);
        }
      },
      { threshold: 0.1 }
    );
    if (pageEnd.current) observer.observe(pageEnd.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (message.resultUsers >= (page - 1) * 9 && page > 1) {
      dispatch(getConversations({ auth, page }));
    }
  }, [message.resultUsers, page, auth, dispatch]);

  const list = searchUsers.length !== 0 ? searchUsers : message.users;

  return (
    <>
      <form className="message_header" onSubmit={handleSearch}>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search people…"
          aria-label="Search conversations"
        />
        <button style={{ display: "none" }} type="submit">
          Search
        </button>
      </form>

      <div className="message_chat_list">
        {list.map((user) => (
          <ChatContactItem
            key={user._id}
            contact={user}
            isActive={id === user._id}
            preview={user.text || user.fullname}
            onClick={() => handleAddUser(user)}
          />
        ))}

        <button style={{ opacity: 0 }} ref={pageEnd} type="button">
          Load more
        </button>
      </div>
    </>
  );
};

export default LeftSide;
