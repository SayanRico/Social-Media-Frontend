import React from 'react';
import { useSelector } from "react-redux";

import Posts from '../components/home/Posts';
import Status from '../components/home/Status';
import RightSideBar from "../components/home/RightSideBar";
import LoaderInline from '../components/alert/LoaderInline';

const Home = () => {
  const { homePosts } = useSelector(state => state);
    return (
      <div className="home row mx-0">
        <div className="col-md-8">
          <Status />
          {homePosts.loading ? (
            <LoaderInline label="Loading your feed…" />
          ) : homePosts.result === 0 ? (
            <p className="home-empty" role="status">
              No posts yet. Share something when you are ready.
            </p>
          ) : (
            <Posts />
          )}
        </div>

        <div className="col-md-4">
          <RightSideBar />
        </div>
      </div>
    );
}

export default Home;
