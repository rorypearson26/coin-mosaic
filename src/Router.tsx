import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { HomePage } from "./pages/Home.page";

const router = createBrowserRouter([
  {
    path: "/coin-mosaic/",
    element: <HomePage />,
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
