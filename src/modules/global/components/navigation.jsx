/* eslint-disable no-nested-ternary */
import React, { useState } from "react";
import NavInner from "./navInner";

const Navigation = ({ menuCollapse, setmenuCollapse }) => {
  const [navigations] = useState([
    {
      name: "Dashboard",
      link: "/",
      disabled: false,
      available: true,
      parent: "",
    },
    {
      name: "All Reports",
      link: "/all-reports",
      disabled: false,
      available: true,
      parent: "",
    },
    {
      name: "Report Details",
      link: "/report-details",
      disabled: false,
      available: true,
      parent: "",
    },
    {
      name: "Help",
      link: "/help",
      disabled: false,
      available: true,
    },
  ]);

  return (
    <>
      {navigations.map(({ name, link, disabled, available, parent, sub }) => (
        <NavInner
          name={name}
          link={link}
          disabled={disabled}
          available={available}
          parent={parent}
          menuCollapse={menuCollapse}
          setmenuCollapse={setmenuCollapse}
          sub={sub}
          key={name.replace(/\s/g, "-")}
        />
      ))}
    </>
  );
};
export default Navigation;
