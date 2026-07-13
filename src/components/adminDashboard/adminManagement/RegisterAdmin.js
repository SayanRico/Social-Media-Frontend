import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerAdmin } from "../../../redux/actions/authAction";
import InputField from "../../UI/InputField";
import Button from "../../UI/Button";

const RegisterAdmin = () => {
  const { alert } = useSelector((state) => state);
  const dispatch = useDispatch();

  const initialState = {
    fullname: "",
    username: "",
    email: "",
    password: "",
    cf_password: "",
    gender: "male",
  };
  const [userData, setUserData] = useState(initialState);
  const { fullname, username, email, password, cf_password, gender } = userData;
  const [typePass, setTypePass] = useState(false);
  const [typeCfPass, setTypeCfPass] = useState(false);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerAdmin({ ...userData, role: "admin" }));
    setUserData(initialState);
  };

  return (
    <form onSubmit={handleSubmit}>
      <InputField
        label="Full name"
        name="fullname"
        value={fullname}
        onChange={handleChangeInput}
        error={alert.fullname}
        required
      />
      <InputField
        label="Username"
        name="username"
        value={username.toLowerCase().replace(/ /g, "")}
        onChange={handleChangeInput}
        error={alert.username}
        required
      />
      <InputField
        label="Email"
        type="email"
        name="email"
        value={email}
        onChange={handleChangeInput}
        error={alert.email}
        required
      />
      <InputField
        label="Password"
        type={typePass ? "text" : "password"}
        name="password"
        value={password}
        onChange={handleChangeInput}
        error={alert.password}
        required
        suffix={
          <button type="button" onClick={() => setTypePass(!typePass)}>
            {typePass ? "Hide" : "Show"}
          </button>
        }
      />
      <InputField
        label="Confirm password"
        type={typeCfPass ? "text" : "password"}
        name="cf_password"
        value={cf_password}
        onChange={handleChangeInput}
        error={alert.cf_password}
        required
        suffix={
          <button type="button" onClick={() => setTypeCfPass(!typeCfPass)}>
            {typeCfPass ? "Hide" : "Show"}
          </button>
        }
      />

      <div className="auth_role">
        <button
          type="button"
          className={`auth_role__chip ${gender === "male" ? "is-active" : ""}`}
          onClick={() => setUserData({ ...userData, gender: "male" })}
        >
          Male
        </button>
        <button
          type="button"
          className={`auth_role__chip ${gender === "female" ? "is-active" : ""}`}
          onClick={() => setUserData({ ...userData, gender: "female" })}
        >
          Female
        </button>
      </div>

      <Button type="submit" fullWidth size="lg">
        Create admin
      </Button>
    </form>
  );
};

export default RegisterAdmin;
