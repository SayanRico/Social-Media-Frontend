import React, { useEffect, useState, useRef } from "react";
import UserCard from "../UserCard";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ChatMessage from "./ChatMessage";
import Icons from "../Icons";
import Button from "../UI/Button";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";
import { imageShow, videoShow } from "../../utils/mediaShow";
import { imageUpload } from "../../utils/imageUpload";
import {
  addMessage,
  getMessages,
  MESSAGE_TYPES,
} from "../../redux/actions/messageAction";
import Loader from "../UI/Loader";

const RightSide = () => {
  const { auth, message, theme, socket } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [user, setUser] = useState([]);
  const [text, setText] = useState("");
  const [page, setPage] = useState(0);
  const [data, setData] = useState([]);
  const { id } = useParams();
  const [media, setMedia] = useState([]);
  const [loadMedia, setLoadMedia] = useState(false);

  const refDisplay = useRef();
  const pageEnd = useRef();

  useEffect(() => {
    const newData = message.data.filter(
      (item) => item.sender === auth.user._id || item.sender === id
    );
    setData(newData);
  }, [message.data, auth.user._id, id]);

  useEffect(() => {
    const newUser = message.users.find((u) => u._id === id);
    if (newUser) setUser(newUser);
  }, [message.users, id]);

  const handleChangeMedia = (e) => {
    const files = [...e.target.files];
    let err = "";
    let newMedia = [];

    files.forEach((file) => {
      if (!file) return (err = "File does not exist.");
      if (file.size > 1024 * 1024 * 5)
        return (err = "Image size must be less than 5 mb.");
      return newMedia.push(file);
    });
    if (err) {
      dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err } });
    }
    setMedia([...media, ...newMedia]);
  };

  const handleDeleteMedia = (index) => {
    const newArr = [...media];
    newArr.splice(index, 1);
    setMedia(newArr);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim() && media.length === 0) return;
    const draftText = text;
    const draftMedia = media;
    setText("");
    setMedia([]);
    setLoadMedia(true);

    let newArr = [];
    if (draftMedia.length > 0) newArr = await imageUpload(draftMedia);

    const msg = {
      sender: auth.user._id,
      recipient: id,
      text: draftText,
      media: newArr,
      createdAt: new Date().toISOString(),
    };
    setLoadMedia(false);
    await dispatch(addMessage({ msg, auth, socket }));
    if (refDisplay.current) {
      refDisplay.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  };

  useEffect(() => {
    if (id) {
      const getMessagesData = async () => {
        dispatch({
          type: MESSAGE_TYPES.GET_MESSAGES,
          payload: { messages: [] },
        });
        setPage(1);
        await dispatch(getMessages({ auth, id }));
        if (refDisplay.current) {
          refDisplay.current.scrollIntoView({
            behavior: "smooth",
            block: "end",
          });
        }
      };
      getMessagesData();
    }
  }, [id, dispatch, auth]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) setPage((p) => p + 1);
      },
      { threshold: 0.1 }
    );
    if (pageEnd.current) observer.observe(pageEnd.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (message.resultData >= (page - 1) * 9 && page > 1) {
      dispatch(getMessages({ auth, id, page }));
    }
  }, [message.resultData, page, id, auth, dispatch]);

  useEffect(() => {
    if (refDisplay.current) {
      refDisplay.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [text]);

  return (
    <>
      <div className="message_header">
        {user.length !== 0 && (
          <UserCard user={user}>
            <i className="fas fa-trash text-danger" />
          </UserCard>
        )}
      </div>

      <div
        className="chat_container"
        style={{ height: media.length > 0 ? "calc(100% - 200px)" : undefined }}
      >
        <div className="chat_display" ref={refDisplay}>
          <button
            style={{ marginTop: "-25px", opacity: 0 }}
            ref={pageEnd}
            type="button"
          >
            Load
          </button>

          {data.map((msg, index) => {
            const isSent = msg.sender === auth.user._id;
            const peer = isSent ? auth.user : user;
            return (
              <ChatMessage
                key={msg._id || index}
                text={msg.text}
                media={msg.media}
                isSent={isSent}
                timestamp={msg.createdAt}
                senderUsername={peer?.username}
                avatar={!isSent ? peer?.avatar : undefined}
                theme={theme}
              />
            );
          })}

          {loadMedia && (
            <div className="chat-msg chat-msg--sent chat-msg--loading">
              <Loader size="sm" variant="dots" />
            </div>
          )}
        </div>
      </div>

      <div
        className="show_media"
        style={{ display: media.length > 0 ? undefined : "none" }}
      >
        {media.map((item, index) => (
          <div key={index} id="file_media">
            {item.type.match(/video/i)
              ? videoShow(URL.createObjectURL(item), theme)
              : imageShow(URL.createObjectURL(item), theme)}
            <span onClick={() => handleDeleteMedia(index)}>&times;</span>
          </div>
        ))}
      </div>

      <form className="chat_input" onSubmit={handleSubmit}>
        <textarea
          placeholder="Write a message…"
          value={text}
          rows={1}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSubmit(e);
            }
          }}
        />
        <Icons setContent={setText} content={text} theme={theme} />
        <div className="file_upload" title="Attach media">
          <i className="fas fa-image" />
          <input
            type="file"
            name="file"
            id="file"
            multiple
            accept="image/*,video/*"
            onChange={handleChangeMedia}
          />
        </div>
        <Button
          type="submit"
          size="md"
          disabled={!text.trim() && media.length === 0}
        >
          Send
        </Button>
      </form>
    </>
  );
};

export default RightSide;
