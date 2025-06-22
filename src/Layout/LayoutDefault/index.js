import { Link, Outlet } from "react-router-dom";
import "./LayoutDefault.scss";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import { setLogin } from "../../actions/User";
import { useEffect } from "react";
import { checkToken2 } from "../../services/UserServices";
import { deleteCookie, getCookie } from "../../helpers/Cookies";

function LayoutDefault() {
  const isLogin = useSelector((state) => state.UserReducer);
  const dispatch = useDispatch();
  useEffect( () => {
    const fetchApi = async () => {
        const token = getCookie("auth_token");
        const result = await checkToken2(token);
        if(result) {
            dispatch(
              setLogin({
                ok: true,
                id: result.id,
              })
            );
        }   
    }
    fetchApi();

  },[])
  const handleClick = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Are you want Logout?!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      // neu logout
      if (result.isConfirmed) {
        dispatch(
          setLogin({
            ok: false,
            id: null,
          })
        );
        // document.cookie = "auth_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
        deleteCookie("auth_token");
      }
    });
  };
  return (
    <>
      <div className="layout-default">
        <header className="layout-default__header">
          <div className="layout-default__logo">
            <Link to="/" className="menu__link">
              QUIZ
            </Link>
          </div>
          {isLogin?.ok ? (
            <>
              <div className="layout-default__main">
                <div className="menu__button">
                  <Link to="/" className="menu__link">
                    Home
                  </Link>
                </div>
                <div className="menu__button">
                  <Link to="topic" className="menu__link">
                    Topic
                  </Link>
                </div>
                <div className="menu_button">
                  <Link to="answer" className="menu__link">
                    Answer
                  </Link>
                </div>
              </div>
              <div className="layout-default__logout">
                <div className="menu__logout" onClick={handleClick}>
                  Logout
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="menu">
                <div className="menu__login">
                  <Link to="/login" className="menu__link">
                    Login
                  </Link>
                </div>
                <div className="menu__register">
                  <Link to="/register" className="menu__link">
                    Register
                  </Link>
                </div>
              </div>
            </>
          )}
        </header>
        <div className="layout-default__body">
          <Outlet />
        </div>
        <footer className="layout-default__footer">
          Copyright @ 2025 hai vang
        </footer>
      </div>
    </>
  );
}
export default LayoutDefault;
