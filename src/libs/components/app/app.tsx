import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { StorageKey } from "~/libs/enums/enums.ts";
import { getErrorMessage } from "~/libs/helpers/helpers.ts";
import { auth } from "~/packages/auth/auth.ts";
import { DEFAULT_EXPIRE_TIME } from "./libs/constants/constants.ts";

function App() {
  useEffect(() => {
    const refreshToken = window.localStorage.getItem(StorageKey.REFRESH) ?? "";
    const tokenExpire =
      Number(window.localStorage.getItem(StorageKey.TOKEN_EXPIRE)) ??
      DEFAULT_EXPIRE_TIME;
    const refreshTokenExpire =
      Number(window.localStorage.getItem(StorageKey.REFRESH_EXPIRE)) ??
      DEFAULT_EXPIRE_TIME;
    const currentTimestamp = Date.now();

    if (currentTimestamp >= refreshTokenExpire) {
      window.localStorage.removeItem(StorageKey.TOKEN);
      window.localStorage.removeItem(StorageKey.REFRESH);
      return;
    }

    if (tokenExpire === DEFAULT_EXPIRE_TIME) return;

    const tokenTtl = tokenExpire - Date.now();
    const intervalId = setInterval(async () => {
      try {
        const {
          accessToken,
          refreshToken: newRefreshToken,
          refreshTokenExpire,
          tokenExpire,
        } = await auth.refreshToken(refreshToken);
        window.localStorage.setItem(StorageKey.TOKEN, accessToken);
        window.localStorage.setItem(StorageKey.REFRESH, newRefreshToken);
        window.localStorage.setItem(
          StorageKey.TOKEN_EXPIRE,
          String(tokenExpire)
        );
        window.localStorage.setItem(
          StorageKey.REFRESH_EXPIRE,
          String(refreshTokenExpire)
        );
      } catch (error) {
        alert(getErrorMessage(error));
      }
    }, tokenTtl);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return <Outlet />;
}

export { App };
