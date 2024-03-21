import React from "react";
import ReactDOM from "react-dom/client";
import { Navigate } from "react-router-dom";
import { App, RouterProvider } from "~/libs/components/components.ts";
import { AppRoute } from "~/libs/enums/enums.ts";
import { Auth } from "~/pages/auth/auth.tsx";
import "~/assets/css/styles.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider
      routes={[
        {
          path: AppRoute.ROOT,
          element: <App />,
          children: [
            {
              index: true,
              element: <Navigate to={AppRoute.LOGIN} />,
            },
            {
              path: AppRoute.LOGIN,
              element: <Auth />,
            },
            {
              path: AppRoute.SIGN_UP,
              element: <Auth />,
            },
            {
              path: AppRoute.FORGOT_PASSWORD,
              element: <Auth />,
            },
            {
              path: AppRoute.CREATE_NEW_PASSWORD,
              element: <Auth />,
            },
          ],
        },
      ]}
    />
  </React.StrictMode>
);
