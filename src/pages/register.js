import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { register } from "../redux/actions/authAction";
import InputField from "../components/UI/InputField";
import Button from "../components/UI/Button";
import Logo from "../components/Logo";

const Register = () => {
  const { auth, alert } = useSelector((state) => state);
  const dispatch = useDispatch();
  const history = useHistory();

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

  useEffect(() => {
    if (auth.token) history.push("/");
  }, [auth.token, history]);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register(userData));
  };

  return (
    <div className="auth_page auth_page--split">
      <section className="auth_hero" aria-label="Face Meet brand">
        <div className="auth_hero__glow" aria-hidden />
        <div className="auth_hero__content">
          <Logo size="hero" />
          <h1 className="auth_hero__title">Join the conversation.</h1>
          <p className="auth_hero__copy">
            Create your Face Meet profile and start sharing with people who
            matter.
          </p>
        </div>
      </section>

      <section className="auth_form_pane">
        <form onSubmit={handleSubmit} className="auth_card">
          <div className="auth_brand auth_brand--form">
            <Logo size="md" className="auth_brand__mobile-logo" />
            <h2 className="auth_form_title">Create account</h2>
            <p className="auth_sub">It only takes a minute</p>
          </div>

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
              <button
                type="button"
                className="ui-field__suffix"
                onClick={() => setTypePass(!typePass)}
              >
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
              <button
                type="button"
                className="ui-field__suffix"
                onClick={() => setTypeCfPass(!typeCfPass)}
              >
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
              className={`auth_role__chip ${
                gender === "female" ? "is-active" : ""
              }`}
              onClick={() => setUserData({ ...userData, gender: "female" })}
            >
              Female
            </button>
          </div>

          <Button type="submit" fullWidth size="lg">
            Create account
          </Button>

          <p className="auth_footer">
            Already have an account?{" "}
            <Link to="/" className="auth-link">
              Sign in
            </Link>
          </p>
        </form>
      </section>
    </div>
  );
};

export default Register;
