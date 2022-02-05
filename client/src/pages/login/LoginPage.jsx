import "./LoginPage.css";
import { useRef, useContext } from "react";
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import CircularProgress from "@mui/material/CircularProgress";

export default function Loginpage() {
  const email = useRef();
  const password = useRef();
  const { user, isFetching, error, dispatch } = useContext(AuthContext);

  const handleClick = (e) => {
    e.preventDefault();
    loginCall(
      {
        email: email.current.value,
        password: password.current.value,
      },
      dispatch
    );
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Mạng xã hội Tom</h3>
          <span className="loginDesc">
            Kết nối với bạn bè và thế giới xung quanh bạn trên mạng xã hội Tom.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <input
              placeholder="Email"
              type="email"
              className="loginInput"
              required
              ref={email}
            />
            <input
              placeholder="Mật khẩu"
              required
              minLength="6"
              ref={password}
              type="password"
              className="loginInput"
            />
            <button className="loginButton" type="submit" disabled={isFetching}>
              {isFetching ? (
                <CircularProgress color="success" size="20px" />
              ) : (
                "Đăng nhập"
              )}
            </button>
            <span className="loginForgot">Quên mật khẩu?</span>
            <button className="loginRegisterButton">
              {" "}
              {isFetching ? (
                <CircularProgress color="success" size="20px" />
              ) : (
                "Tạo tài khoản mới"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
