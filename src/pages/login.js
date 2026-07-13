import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { adminLogin, login } from "../redux/actions/authAction";
import { useDispatch, useSelector } from "react-redux";
import InputField from "../components/UI/InputField";
import Button from "../components/UI/Button";
import Logo from "../components/Logo";

const Login = () => {
  const initialState = { email: "", password: "" };
  const [userData, setUserData] = useState(initialState);
  const [userType, setUserType] = useState(false);
  const [totpCode, setTotpCode] = useState("");
  const [needs2FA, setNeeds2FA] = useState(false);
  const { email, password } = userData;
  const [typePass, setTypePass] = useState(false);

  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (auth.token) history.push("/");
  }, [auth.token, history]);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userType) dispatch(login(userData));
    else dispatch(adminLogin({ ...userData, totpCode }));
  };

  return (
    <div className="auth_page auth_page--split">
      <section className="auth_hero" aria-label="Face Meet brand">
        <div className="auth_hero__glow" aria-hidden />
        <div className="auth_hero__content">
          <Logo size="hero" />
          <h1 className="auth_hero__title">Meet people. Share moments.</h1>
          <p className="auth_hero__copy">
            Face Meet is where your circle posts, chats, and stays close —
            beautifully simple social for everyday life.
          </p>
          <ul className="auth_hero__points">
            <li>Share photos &amp; stories with friends</li>
            <li>Real-time messages &amp; notifications</li>
            <li>Discover people you&apos;ll actually want to follow</li>
          </ul>
        </div>
      </section>

      <section className="auth_form_pane">
        <form onSubmit={handleSubmit} className="auth_card">
          <div className="auth_brand auth_brand--form">
            <Logo size="md" className="auth_brand__mobile-logo" />
            <h2 className="auth_form_title">Welcome back</h2>
            <p className="auth_sub">Sign in to continue to Face Meet</p>
          </div>

          <InputField
            label="Email"
            type="email"
            name="email"
            placeholder="you@example.com"
            value={email}
            onChange={handleChangeInput}
            required
          />

          <InputField
            label="Password"
            type={typePass ? "text" : "password"}
            name="password"
            placeholder="Your password"
            value={password}
            onChange={handleChangeInput}
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

          {userType && (
            <InputField
              label="2FA code (if enabled)"
              type="text"
              name="totpCode"
              placeholder="6-digit code"
              value={totpCode}
              onChange={(e) => setTotpCode(e.target.value)}
              inputMode="numeric"
            />
          )}

          <div className="auth_role" role="group" aria-label="Account type">
            <button
              type="button"
              className={`auth_role__chip ${!userType ? "is-active" : ""}`}
              onClick={() => setUserType(false)}
            >
              User
            </button>
            <button
              type="button"
              className={`auth_role__chip ${userType ? "is-active" : ""}`}
              onClick={() => setUserType(true)}
            >
              Admin
            </button>
          </div>

          <Button
            type="submit"
            fullWidth
            size="lg"
            disabled={!email || !password}
          >
            Sign in
          </Button>

          <p className="auth_footer">
            Don&apos;t have an account?{" "}
            <Link to="/register" className="auth-link">
              Create one
            </Link>
          </p>
        </form>
      </section>
    </div>
  );
};

export default Login;
