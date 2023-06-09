import { RouterProvider } from "react-router-dom";
import router from "./router";
import { globalStyles } from "./theme/global";

function App() {
  /* Setup the stiches global styles */
  globalStyles();

  return <RouterProvider router={router} />;
}

export default App;
