import React from "react";

import * as Icon from "react-feather";
import { FaRegBuilding } from "react-icons/fa";
import { MdTableRows } from "react-icons/md";


export const SidebarData = [
  {
    label: "Master Setup",
    submenuOpen: true,
    showSubRoute: false,
    submenuHdr: "Master Setup",
    submenuItems: [
      {
        label: "Area",
        link: "/area",
        icon: <Icon.MapPin />,
        showSubRoute: false,
        submenu: false,
      },
      {
        label: "Education",
        link: "/education",
        icon: <Icon.Book />,
        showSubRoute: false,
        submenu: false,
      },
      {
        label: "Institutes",
        link: "/institutes",
        icon: <FaRegBuilding />,
        showSubRoute: false,
        submenu: false,
      },
      {
        label: "Users",
        link: "/users",
        icon: <Icon.Users />,
        showSubRoute: false,
        submenu: false,
      },
    ],
  },
  {
    label: "Transactions",
    submenuOpen: true,
    showSubRoute: false,
    submenuHdr: "Transactions",
    submenuItems: [
      {
        label: "View Member",
        link: "/viewMember",
        icon: <MdTableRows />,
        showSubRoute: false,
      },
      {
        label: "Add New Member",
        link: "/addNewMember",
        icon: <Icon.UserPlus />,
        showSubRoute: false,
        submenu: false,
      },
    ],
  },
  // {
  //   label: "Reports",
  //   submenuOpen: true,
  //   showSubRoute: false,
  //   submenuHdr: "Reports",
  //   submenuItems: [
  //     {
  //       label: "View Member Details",
  //       link: "/sales-report",
  //       icon: <Icon.BarChart2 />,
  //       showSubRoute: false,
  //     },
  //   ],
  // },
];
