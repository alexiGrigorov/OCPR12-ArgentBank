import { Provider } from "react-redux";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router";

import store from "./context/store";
import RootLayout from "./layouts/RootLayout";
import HomePage from "./pages/HomePage";
import SignInPage from "./pages/SignInPage";
import RequireAuth from "./components/RequireAuth";
import UserPage from "./pages/UserPage";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          element: <Outlet />,
          children: [
            { index: true, element: <HomePage /> },
            { path: "sign-in", element: <SignInPage /> },

            // 🔒 Protected routes
            {
              element: <RequireAuth />,
              children: [{ path: "user", element: <UserPage /> }],
            },

            {
              path: "*",
              element: null,
              loader: () => {
                throw new Error("No page with this address");
              },
            },
          ],
        },
      ],
    },
  ],
  {
    basename: "/OCPR12-ArgentBank",
  },
);
function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} fallbackElement={<div>Loading...</div>} />
    </Provider>
  );
}

export default App;
