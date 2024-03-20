import "~/assets/css/styles.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { App, RouterProvider } from "~/libs/components/components.ts";
import { AppRoute } from "./libs/enums/enums.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider
      routes={[
        {
          path: AppRoute.ROOT,
          element: <App />,
        },
      ]}
    />
  </React.StrictMode>
);
