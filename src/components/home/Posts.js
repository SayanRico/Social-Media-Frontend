import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import PostCard from "../PostCard";
import LoadMoreBtn from "../LoadMoreBtn";
import LoaderInline from "../alert/LoaderInline";
import { getDataAPI } from "../../utils/fetchData";
import { POST_TYPES } from "../../redux/actions/postAction";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";
import Button from "../UI/Button";

const Posts = () => {
  const { homePosts, auth, theme } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [load, setLoad] = useState(false);

  const handleLoadMore = async () => {
    setLoad(true);
    const res = await getDataAPI(
      `posts?limit=${homePosts.page * 9}`,
      auth.token
    );
    dispatch({
      type: POST_TYPES.GET_POSTS,
      payload: { ...res.data, page: homePosts.page + 1 },
    });
    setLoad(false);
  };

  if (!homePosts.loading && homePosts.posts.length === 0) {
    return (
      <div className="home-empty">
        <div className="home-empty__icon">
          <i className="far fa-images" />
        </div>
        <h3>Your feed is quiet</h3>
        <p>Follow people or share your first moment to get started.</p>
        <Button
          size="md"
          onClick={() =>
            dispatch({ type: GLOBALTYPES.STATUS, payload: true })
          }
        >
          Create a post
        </Button>
      </div>
    );
  }

  return (
    <div className="posts">
      {homePosts.posts.map((post) => (
        <PostCard key={post._id} post={post} theme={theme} />
      ))}

      {load && <LoaderInline label="Loading more posts…" compact />}

      <LoadMoreBtn
        result={homePosts.result}
        page={homePosts.page}
        load={load}
        handleLoadMore={handleLoadMore}
      />
    </div>
  );
};

export default Posts;
