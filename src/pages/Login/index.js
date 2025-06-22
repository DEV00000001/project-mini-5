
import {checkLogin2 } from "../../services/UserServices";
import "./Login.scss";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLogin } from "../../actions/User";
import { setCookie } from "../../helpers/Cookies";

function Login() {
  const isLogin = useSelector(state => state.UserReducer);
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
      const data = {
        email: e.target[0].value,
        password: e.target[1].value,
      };
      const result = await checkLogin2(data);
      if (result) {
            // document.cookie = `auth_token=${result[0].token}; path=/; max-age=604800;`;
            // #TODO: su dung setCookie trong helper ,
            setCookie("auth_token",result[0].token,7);
            Swal.fire({
                title: "Login Success!",
                icon: "success",
                draggable: true
            });

            dispatch(setLogin({
              ok : true,
              id : result[0].id
            }));
 
      } else {
          Swal.fire({
            title: "Login Fail!",
            icon: "error",
            draggable: true
        });

      }
  };

  return (
    <>
      {isLogin?.ok ? (<Navigate to="/"/>) : (
        <form onSubmit={handleSubmit} className="form-login">
        <h2>Login Quiz</h2>
        <input
          //  #TODO: thieu type cho o input , thieu type thi ko check duoc kieu du lieu , khi submit du lieu se ko duoc luu cho lan tiep theo
          type="email"
          placeholder="Email"
          className="form-login__email"
          autoComplete="on"
        ></input>
        <input
          type="password"
          placeholder="Password"
          className="form-login__pass"
          autoComplete="on"
        ></input>
        <input type="submit" value="Login" className="form-login__button" />
        </form>
    )}
    </>
  );
}
export default Login;
