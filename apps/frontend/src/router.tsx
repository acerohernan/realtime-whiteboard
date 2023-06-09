import { createBrowserRouter } from "react-router-dom";
import HomeView from "./views/home";

const router = createBrowserRouter([
  {
    path: "",
    element: <HomeView />,
  },
  {
    path: "login",
    element: <div>Login</div>,
  },
]);

export default router;
