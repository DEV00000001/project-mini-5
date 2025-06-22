import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function PrivateRoute () {
  const isLogin = useSelector(state => state.UserReducer);
  return (
    <>
      {isLogin?.ok ? (<Outlet/>) : (<Navigate to="/"/>)}
    </>
  )
}
export default PrivateRoute;