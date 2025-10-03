import React from "react";

import * as Icon from "react-feather";

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
        icon: <Icon.Box />,
        showSubRoute: false,
        submenu: false,
      },
      {
        label: "Education",
        link: "/education",
        icon: <Icon.PlusSquare />,
        showSubRoute: false,
        submenu: false,
      },
      {
        label: "Institutes",
        link: "/institutes",
        icon: <Icon.Codesandbox />,
        showSubRoute: false,
        submenu: false,
      },
      {
        label: "Users",
        link: "/users",
        icon: <Icon.Codesandbox />,
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
        icon: <Icon.BarChart2 />,
        showSubRoute: false,
      },
      {
        label: "Enroll Member",
        link: "/enrollMember",
        icon: <Icon.PlusSquare />,
        showSubRoute: false,
        submenu: false,
      },
    ],
  },
  {
    label: "Reports",
    submenuOpen: true,
    showSubRoute: false,
    submenuHdr: "Reports",
    submenuItems: [
      {
        label: "View Member Details",
        link: "/sales-report",
        icon: <Icon.BarChart2 />,
        showSubRoute: false,
      },
    ],
  },
];
