import { createBrowserRouter } from "react-router-dom";
import HomeView from "./views/home";
import WhiteboardView from "./views/whiteboard";
import KonvaView from "./views/konva";
import KonvaCreateView from "./views/konva-create";

const router = createBrowserRouter([
  {
    path: "",
    element: <HomeView />,
  },
  {
    path: "whiteboard",
    element: <WhiteboardView />,
  },
  {
    path: "konva",
    element: <KonvaView />,
  },
  {
    path: "konva/create",
    element: <KonvaCreateView />,
  },
]);

export default router;
