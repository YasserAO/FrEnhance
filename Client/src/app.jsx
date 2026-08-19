import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
  Navigate,
} from "react-router-dom";


// Animation Framer
import { Framer } from "./layouts/homeFrame";

// Main Page
import { MainPage } from "./layouts/MainPage";
import { Home } from "./pages/home/Home";
import URLverification from "./pages/Auth/URLVerification";
import { URLPasswordReset } from "./pages/Auth/URLPasswordReset";
import { PasswordResetRequest } from "./pages/Auth/PasswordResetRequest";
import About from "./pages/home/About";
import Contact from "./pages/home/Contact";
import Features from "./pages/home/Features";

// Auth
import { Auth } from "./layouts/Auth";
import { Login } from "./pages/Auth/Login";
import { Register } from "./pages/Auth/Register";
import { DashBoard } from "./layouts/Dashboard";
import { NotFound } from "./layouts/NotFound";

// Dashboard
import { MainDashboard } from "./pages/dashboard/mainDashboard";
import { CreateAText, EditedTextLoader } from "./pages/dashboard/CreateAText";
import { TextReadMode } from "./partials/article/TextReadMode";
import Verify from "./pages/Auth/CODEVerification";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<MainPage></MainPage>}>
        <Route
          index
          element={
            <Framer>
              <Home />
            </Framer>
          }
        ></Route>
        <Route
          path="about"
          element={
            <Framer>
              <About />
            </Framer>
          }
        ></Route>
        <Route
          path="contact"
          element={
            <Framer>
              <Contact />
            </Framer>
          }
        ></Route>
        <Route
          path="features"
          element={
            <Framer>
              <Features />
            </Framer>
          }
        ></Route>
        <Route
          path="verify"
          element={
            <Framer>
              <Verify />
            </Framer>
          }
        ></Route>
        <Route
          path="email-verification/:id"
          element={<URLverification />}
        ></Route>

        <Route path="home" element={<Navigate to="/" replace />}></Route>

        <Route path="*" element={<NotFound />}></Route>
      </Route>
      <Route path="/auth" element={<Auth />}>
        <Route path="password-reset/:id" element={<URLPasswordReset />}></Route>
        <Route
          path="password-reset-request"
          element={<PasswordResetRequest />}
        ></Route>
        <Route index path="login" element={<Login></Login>}></Route>
        <Route path="register" element={<Register></Register>}></Route>
      </Route>
      <Route path="/dashboard" element={<DashBoard />}>
        <Route index element={<MainDashboard />}></Route>
        <Route path="create" element={<CreateAText />}></Route>
        <Route
          path="edit"
          loader={EditedTextLoader}
          element={<CreateAText />}
        ></Route>
        {/* <Route path="insert" element={<CreateAText />}></Route> */}
        <Route path="readmode">
          <Route path=":id" element={<TextReadMode />}></Route>
        </Route>
      </Route>
    </>,
  ),
);
const App = () => {
  return <RouterProvider router={router}></RouterProvider>;
};

export default App;
