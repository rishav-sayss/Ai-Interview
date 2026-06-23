import { login, register, logout, getuser } from "../service/auth.service.js";
import { setLoading, setUser } from "../state/auth.state.js";
import { useDispatch } from "react-redux";
import { useCallback } from "react";

export function useHooks() {
  const dispatch = useDispatch();

  const handelregister = useCallback(async ({ username, email, password }) => {
    const data = await register({ username, email, password });
    dispatch(setUser(data.user || data));
    return data;
  }, [dispatch]);

  const handleLogin = useCallback(async ({ email, password }) => {
    const data = await login({ email, password });
    dispatch(setUser(data.user || data));
    return data;
  }, [dispatch]);

  const handleLogout = useCallback(async () => {
    const data = await logout();
    dispatch(setUser(null));
    return data;
  }, [dispatch]);

  const handelgetme = useCallback(async () => {
    try {
      dispatch(setLoading(true));
      const data = await getuser();
      dispatch(setUser(data.user || data));
    } catch {
      dispatch(setUser(null));
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch]);

  return { handelregister, handleLogin, handleLogout, handelgetme };
}

