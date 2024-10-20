import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  InformationCircleIcon,
  ServerStackIcon,
  RectangleStackIcon,
  ArrowUpTrayIcon
} from "@heroicons/react/24/solid";
import { Home, Workers, Sources } from "@/pages/dashboard";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
    layout_ar: "الرئيسية",
    pages: [
      // {
      //   icon: <HomeIcon {...icon} />,
      //   name: "الرئيسية",
      //   path: "/home",
      //   element: <Home />,
      // },
      // {
      //   icon: <UserCircleIcon {...icon} />,
      //   name: "profile",
      //   path: "/profile",
      //   element: <Profile />,
      // },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "عمليات الإثراء",
        path: "/workers",
        element: <Workers />,
      },
      {
        icon: <ArrowUpTrayIcon {...icon} />,
        name: "المصادر",
        path: "/sources",
        element: <Sources />,
      },

    ],
  },

];

export default routes;
