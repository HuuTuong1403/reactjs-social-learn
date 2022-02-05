import "./RegisterPage.css";

export default function Register() {
  return (
    <div className="register">
      <div className="registerWrapper">
        <div className="registerLeft">
          <h3 className="registerLogo">Mạng xã hội Tom</h3>
          <span className="registerDesc">
            Kết nối với bạn bè và thế giới xung quanh bạn trên mạng xã hội Tom..
          </span>
        </div>
        <div className="registerRight">
          <div className="registerBox">
            <input placeholder="Tên đăng nhập" className="registerInput" />
            <input placeholder="Email" className="registerInput" />
            <input placeholder="Mật khẩu" className="registerInput" />
            <input placeholder="Nhập lại mật khẩu" className="registerInput" />
            <button className="registerButton">Đăng ký</button>
            <button className="registerLogInButton">
              Đăng nhập vào tài khoản
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
