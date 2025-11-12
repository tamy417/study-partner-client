import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import "./index.css";
import App from "./App.jsx";
import MainLayout from "./Layout/MainLayout.jsx";
import Home from "./Pages/Home.jsx";
import NotFound from "./Pages/NotFound.jsx";
import AuthProvider from "./Context/AuthProvider.jsx";
import Login from "./Pages/Login.jsx";
import Register from "./Pages/Register.jsx";
import FindPartners from "./Pages/FindPartners.jsx";
import CreateProfile from "./Pages/CreateProfile.jsx";
import MyConnections from "./Pages/MyConnections.jsx";
import Profile from "./Pages/Profile.jsx";
import PartnerDetails from "./Pages/PartnerDetails.jsx";
import PrivateRoute from "./Context/PrivateRoute.jsx";
import ThemeProvider from "./Context/ThemeContext.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <NotFound></NotFound>,
    children: [
      {
        index: true,
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/find-partners",
        element: <FindPartners></FindPartners>,
      },
      {
        path: "/create-profile",
        element: (
          <PrivateRoute>
            <CreateProfile></CreateProfile>
          </PrivateRoute>
        ),
      },
      {
        path: "/my-connections",
        element: (
          <PrivateRoute>
            <MyConnections></MyConnections>
          </PrivateRoute>
        ),
      },
      {
        path: "/partner/:id",
        element: (
          <PrivateRoute>
            <PartnerDetails></PartnerDetails>
          </PrivateRoute>
        ),
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/profile",
        element: <Profile></Profile>,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <ThemeProvider>
        <RouterProvider router={router}></RouterProvider>
      </ThemeProvider>
    </AuthProvider>
  </StrictMode>
);
