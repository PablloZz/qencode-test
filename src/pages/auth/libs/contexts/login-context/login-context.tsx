import { createContext, useContext, useState } from "react";
import {
  type LoginRequestDto,
  type LoginResponseDto,
  auth,
} from "~/packages/auth/auth.ts";
import { StorageKey } from "~/libs/enums/enums.ts";
import { getErrorMessage } from "~/libs/helpers/helpers.ts";
import { LoginContext as TLoginContext } from "./libs/types/types.ts";

type Properties = {
  children: React.ReactNode;
};

const LoginContext = createContext({} as TLoginContext);

function LoginProvider({ children }: Properties) {
  const [user, setUser] = useState<LoginResponseDto | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleLogin(payload: LoginRequestDto) {
    try {
      setLoading(true);
      const user = await auth.login(payload);
      localStorage.setItem(StorageKey.TOKEN, user.accessToken);
      localStorage.setItem(StorageKey.TOKEN_EXPIRE, String(user.tokenExpire));
      localStorage.setItem(StorageKey.REFRESH, user.refreshToken);
      localStorage.setItem(
        StorageKey.REFRESH_EXPIRE,
        String(user.refreshTokenExpire)
      );
      setUser(user);
    } catch (error) {
      alert(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  }

  const contextValue: TLoginContext = {
    user,
    loading,
    handleLogin,
  };

  return (
    <LoginContext.Provider value={contextValue}>
      {children}
    </LoginContext.Provider>
  );
}

function useLogin() {
  return useContext(LoginContext);
}

export { LoginProvider, useLogin };
