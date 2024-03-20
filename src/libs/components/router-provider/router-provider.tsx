import {
  createBrowserRouter,
  type RouteObject,
  RouterProvider as LibraryRouterProvider,
} from "react-router-dom";

type Properties = {
  routes: RouteObject[];
};

function RouterProvider({ routes }: Properties) {
  return <LibraryRouterProvider router={createBrowserRouter(routes)} />;
}

export { RouterProvider };
