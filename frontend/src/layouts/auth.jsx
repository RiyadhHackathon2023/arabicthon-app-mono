import { Routes, Route } from "react-router-dom";
import {
  ChartPieIcon,
  UserIcon,
  UserPlusIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/solid";
import { Navbar, Footer } from "@/widgets/layout";
import routes from "@/routes";
import { SignIn } from "@/pages/auth";

export function Auth() {

  return (
    <div className="relative min-h-screen w-full">
      <Routes>
        <Route exact path={'/'} element={<SignIn/>} />
      </Routes>
    </div>
  );
}

Auth.displayName = "/src/layout/Auth.jsx";

export default Auth;
