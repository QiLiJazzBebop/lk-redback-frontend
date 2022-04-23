import React from "react";
import { withRouter } from "react-router-dom";
import { useHistory } from "react-router";
import "../styles/_dropdown.scss";
import { Button } from "@progress/kendo-react-buttons";
import { Drawer, DrawerContent } from "@progress/kendo-react-layout";
import { DrawerSelectEvent } from "@progress/kendo-react-layout/dist/npm/drawer/interfaces/DrawerSelectEvent";
import { CustomNodeJsGlobal } from "../data/models";

declare var global: CustomNodeJsGlobal;

global.name = ''
global.img_url = 'https://avatars2.githubusercontent.com/u/34351424?s=460&v=4'

const items = [
  {
    text: "Logout",
    icon: "k-i-login",
    route: "/",
    children: null,
  },
  // {
  //   text: "Home",
  //   icon: "k-i-home",
  //   route: "/home",
  //   children: null,
  // },
  // {
  //   text: "Dashboard",
  //   icon: "k-i-dribbble",
  //   route: "/dashboard",
  //   children: null,
  // },
];

const DrawerRouterContainer = (props: React.PropsWithChildren<any>) => {
  const history = useHistory();
  const [expanded, setExpanded] = React.useState(false);
  const [selectedId, setSelectedId] = React.useState(0);

  const onSelect = (e: DrawerSelectEvent) => {
    setSelectedId(e.itemIndex);
    setExpanded(false);
    history.push(e.itemTarget.props.route);
  };

  return (
    <div>
      <Drawer
        expanded={expanded}
        items={items.map((item) => ({
          ...item,
          selected: items[selectedId].text === item.text,
        }))}
        onSelect={onSelect}
        animation={{ duration: 50 }}
        position="start"
        onOverlayClick={() => {
          setExpanded((currentExpanded) => {
            return !currentExpanded;
          });
        }}
      >
        <DrawerContent>
          <div className="header">
            <h1>
              <span>
                <Button
                  icon="menu"
                  look="flat"
                  onClick={() => {
                    setExpanded((currentExpanded) => {
                      return !currentExpanded;
                    });
                  }}
                />
                <span className="title">
                  <a className="a" href="/">
                    Garmin Dashboard
                  </a>
                  {/* <span className="divider">|</span> */}
                  {/* <span className="fund">{items[selectedId].text}</span> */}
                </span>
              </span>
              <div className="dropdown">
                <img className="dropbtn" alt={global.name} src={global.img_url} />
                <div className="dropdown-content">
                  <a href="https://connect.garmin.com/signin">{global.name}</a>
                </div>
              </div>
            </h1>
          </div>
          {props.children}
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default withRouter(DrawerRouterContainer);
