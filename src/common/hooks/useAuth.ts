import { useState, useCallback } from "react";
import {
  useLocalStorage,
  writeStorage,
  deleteFromStorage,
} from "@rehooks/local-storage";
import { apiRequest } from "../axios";

export const useAuth = () => {
  const [storedToken] = useLocalStorage<string>("token");
  const [token, setToken] = useState<null | string>(
    storedToken ? storedToken : null
  );
  const [storedUser] = useLocalStorage<any>("user");
  const [user, setUser] = useState<null | any>(storedUser ? storedUser : null);

  const login = useCallback(async (identifiant: string, password: string) => {
    const authResponse = await apiRequest("POST", "/auth", {
      identifiant,
      password,
    });
    setToken(authResponse.data.session_token);
    writeStorage("token", authResponse.data.session_token);

    const myInfoResponse = await apiRequest("POST", "/myinfo", {
      session_token: authResponse.data.session_token,
    });
    setUser(myInfoResponse.data);
    writeStorage("user", myInfoResponse.data);
  }, []);

  const logout = useCallback(async () => {
    await apiRequest("POST", "/logout", {
      session_token: token,
    });
    deleteFromStorage("user");
    deleteFromStorage("token");
  }, [token]);

  return { user, token, login, logout };
};
