import { useNavigate } from "react-router-dom";
import { AUTH_PATH } from "constant";
import "./style.css";

const Header = () => {
  const navigate = useNavigate();

  const onTeamMenuClickHandler = (page: string) => {
    // 페이지에 따라 다른 경로로 이동
    if (page === "team") {
      navigate("/team-schedule");
    } else if (page === "personal") {
      navigate("/personal-schedule");
    } else if (page === "login") {
      navigate(AUTH_PATH());
    }
  };

  return (
    <div className="header" role="banner">
      <div className="header-inner" role="banner">
        <a href="#">
          <img src="/assets/image/logo.PNG" className="img_logo" alt="로고" />
        </a>
        <nav>
          <div className="nav_items">
            <ul>
              <li>
                <div onClick={() => onTeamMenuClickHandler("team")}>
                  {"팀일정"}
                </div>
              </li>
              <li>
                <div onClick={() => onTeamMenuClickHandler("personal")}>
                  {"개인일정"}
                </div>
              </li>
              <li>
                <div onClick={() => onTeamMenuClickHandler("login")}>
                  {"로그인"}
                </div>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Header;
