import { login, register, logout } from "../service/auth.service.js";
import { setUser } from "../state/auth.state.js";
import { useDispatch } from "react-redux";

export function useHooks() {
  const dispatch = useDispatch();

  const handelregister = async ({ username, email, password }) => {
    const data = await register({ username, email, password });
    dispatch(setUser(data.user || data));
    return data;
  };

  const handleLogin = async ({ email, password }) => {
    const data = await login({ email, password });
    dispatch(setUser(data.user || data));
    return data;
  };

  const handleLogout = async () => {
    const data = await logout();
    dispatch(setUser(null));
    return data;
  };

  return { handelregister, handleLogin, handleLogout };
}
