import PrivateRoute from "../components/PrivateRoute";
import LayoutDefault from "../Layout/LayoutDefault";
import Answer from "../pages/Answer";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Topic from "../pages/Topic";
import Error404 from "../pages/Error404";
import Quiz from "../pages/Quiz";
import Result from "../pages/Result";

// #TODO: tao ra bien routes kieu object thay cho routes va route => cau hinh => compile sang kieu cau truc thong thuong
export const routes = [
  {
    path: "/",
    element: <LayoutDefault />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        element: <PrivateRoute />,
        children: [
          {
            path: "/topic",
            element: <Topic />,
          },
          {
            path: "/quiz/:id",
            element: <Quiz />,
          },
          {
            path: "/answer",
            element: <Answer />,
          },
          {
            path: "/result/:id",
            element: <Result />,
          },
        ],
      },
      {
        path: "*",
        element: <Error404 />,
      },
    ],
  },
];
