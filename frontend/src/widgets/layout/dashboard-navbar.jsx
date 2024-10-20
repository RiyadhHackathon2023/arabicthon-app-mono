import { useLocation, Link, useNavigate } from "react-router-dom";
import {
  Navbar,
  Typography,
  Button,
  IconButton,
  Breadcrumbs,
  Input,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
} from "@material-tailwind/react";
import { NavLink } from "react-router-dom";
import { BackwardIcon } from "@heroicons/react/24/solid";
import {
  UserCircleIcon,
  Cog6ToothIcon,
  BellIcon,
  ClockIcon,
  CreditCardIcon,
  Bars3Icon,
} from "@heroicons/react/24/solid";

import {
  useMaterialTailwindController,
  setOpenConfigurator,
  setOpenSidenav,
} from "@/context";
import { useTranslation } from "react-i18next";
import { useAuth } from '@clerk/clerk-react'

const icon = {
  className: "w-5 h-5 text-inherit",
};
export function DashboardNavbar() {
  const [controller, dispatch] = useMaterialTailwindController();
  const { fixedNavbar, openSidenav } = controller;
  const { pathname } = useLocation();
  const [layout, page] = pathname.split("/").filter((el) => el !== "");
  const { t } = useTranslation();

  const { sessionId, signOut, isSignedIn } = useAuth();
  const navigate = useNavigate()
  const handleSignout = async () => {
    await signOut();
    navigate('/auth', { replace: true });
    
  }
  return (
    <Navbar
      color={ "white" }
      className={`rounded-xl transition-all ${
"sticky top-4 z-40 py-3 shadow-md shadow-blue-gray-500/5"
      }`}
      fullWidth
      blurred={true}
    >
      <div className="flex flex-col-reverse justify-between gap-6 md:flex-row md:items-center">
        <div className="capitalize">
          
          <Typography variant="h6" color="blue-gray">
            {t(page)}
          </Typography>
        </div>

        <div className="flex items-center">
          
       
          <div className="">
            <div className="flex gap-1 flex-row justify-center w-full">
            <Button
                variant="outlined"
                color={
                  "white"
                }
                className={`flex items-center py-1 text-center capitalize w-auto bg-[#007475] text-[#FFF] border-[#007475]`}
                fullWidth
                onClick={() => handleSignout()}
              >
                
                <Typography
                  color="inherit"
                  className="font-medium capitalize  color-[#FFF] text-lg font-noto text-center  "
                >
                  تسجيل الخروج
                </Typography>
              </Button>
            </div>
          </div>
          
          
          {/* <Menu>
            <MenuHandler>
              <IconButton variant="text" color="blue-gray">
                <BellIcon className="h-5 w-5 text-blue-gray-500" />
              </IconButton>
            </MenuHandler>
            <MenuList className="w-max border-0">
              
            </MenuList>
          </Menu>
          <IconButton
            variant="text"
            color="blue-gray"
            
          >
            <Cog6ToothIcon className="h-5 w-5 text-blue-gray-500" />
          </IconButton> */}
        </div>
      </div>
    </Navbar>
  );
}

DashboardNavbar.displayName = "/src/widgets/layout/dashboard-navbar.jsx";

export default DashboardNavbar;
