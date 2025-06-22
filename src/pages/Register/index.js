import { register } from "../../services/UserServices";
import "./Register.scss";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import { Navigate } from "react-router-dom";
import { useState } from "react";
import generateToken from "../../helpers/generateToken";
function Register() {
  const [isRegister , setRegister] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(e.target[0].value);
    const fetchApi = async () => {
      const data = {
        fullName: e.target[0].value,
        email: e.target[1].value,
        password: e.target[2].value,
        token: generateToken(),
      };
      const res = await register(data);
      //   console.log(res);
      if (res) {
        // setCookie("auth_token",data.token,7);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Your work has been saved",
          showConfirmButton: false,
          timer: 1500,
        });
        setRegister(true);
      }
    };

    fetchApi();
  };

  return (
    <>
      { isRegister ? (<Navigate to="/login"/>) : (<form onSubmit={handleSubmit} className="form-register ">
        <h2>Register Account</h2>
        <input
          placeholder="FullName"
          className="form-register__fullname"
          name="FullName"
        ></input>
        <input
          placeholder="Email"
          name="Email"
          className="form-register__email"
        ></input>
        <input
          placeholder="Password"
          name="Password"
          className="form-register__pass"
        ></input>
        <input
          type="submit"
          value="Register"
          className="form-register__button"
        />
      </form>) }
      
    </>
  );
}
export default Register;
