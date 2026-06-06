import { RouterProvider } from "react-router-dom";
import { routes } from "./auth.routes";
import "./app.css";
import { useHooks } from "../feature/auth/Hooks/auth.hooks";
import { useSelector } from "react-redux";
import { useEffect } from "react";
function App() {
  const { handelgetme } = useHooks();
  const user = useSelector((state) => state.auth.user);
  console.log(user);

  useEffect(() => {
    handelgetme();
  }, [handelgetme]);

  return <RouterProvider router={routes} />;
}

export default App;
