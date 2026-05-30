import { login, register, logout, getuser } from "../service/auth.service.js";
import { setLoading, setUser } from "../state/auth.state.js";
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

  const handelgetme = async () => {
    try {
         dispatch(setLoading(true))
         const data = await getuser()
         console.log(data.user)
        dispatch(setUser(data.user))
    } catch (error) {
      console.log(error)
    }
    finally{
      dispatch(setLoading(false))
    }
  };

  return { handelregister, handleLogin, handleLogout ,handelgetme };
}
