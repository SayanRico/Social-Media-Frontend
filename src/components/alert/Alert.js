import React from "react";
import { useSelector } from "react-redux";
import Loading from "./Loading";
import ToastContainer from "./ToastContainer";

const Alert = () => {
  const { alert } = useSelector((state) => state);

  return (
    <>
      {alert.loading && <Loading />}
      <ToastContainer />
    </>
  );
};

export default Alert;
