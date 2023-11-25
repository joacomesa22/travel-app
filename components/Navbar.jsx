"use client";

import { useState, useEffect, createElement } from "react";
import Link from "next/link";
import {
  Navbar,
  Collapse,
  IconButton,
  List,
  ListItem,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import {
  ChevronDownIcon,
  Bars3Icon,
  XMarkIcon,
  BanknotesIcon,
} from "@heroicons/react/24/outline";
import { SunIcon, UserGroupIcon } from "@heroicons/react/24/solid";
import { audiowide, montserrat } from "@/assets/fonts";
const navListMenuItems = [
  {
    title: "Translator",
    description: "Translator app",
    icon: UserGroupIcon,
    route: "apis/translator",
  },
  {
    title: "Weather",
    description: "Get the weather of your location",
    icon: SunIcon,
    route: "apis/weather",
  },
  {
    title: "Currency Converter",
    description: "Convert any currency to another",
    icon: BanknotesIcon,
    route: "apis/currency-converter",
  },
  {
    title: "Country Information",
    description: "Learn how we can help you achieve your goals.",
    icon: SunIcon,
    route: "apis/country-info",
  },
];

function NavListMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const renderItems = navListMenuItems.map(
    ({ icon, title, description, route }, key) => (
      <Link href={`/${route}`} key={key}>
        <MenuItem className="flex items-center gap-3 rounded-lg">
          <div className="flex items-center justify-center rounded-lg !bg-blue-gray-50 p-2 ">
            {createElement(icon, {
              strokeWidth: 2,
              className: "h-6 text-gray-900 w-6",
            })}
          </div>
          <div>
            <h6 className="font-bold">{title}</h6>
            <p>{description}</p>
          </div>
        </MenuItem>
      </Link>
    )
  );

  return (
    <>
      <Menu
        open={isMenuOpen}
        handler={setIsMenuOpen}
        offset={{ mainAxis: 20 }}
        placement="bottom"
        allowHover={true}
      >
        <MenuHandler>
          <div>
            <ListItem
              className="flex items-center gap-2 py-2 pr-4 font-medium text-gray-900"
              selected={isMenuOpen || isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen((cur) => !cur)}
            >
              APIs
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`hidden h-3 w-3 transition-transform lg:block ${
                  isMenuOpen ? "rotate-180" : ""
                }`}
              />
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`block h-3 w-3 transition-transform lg:hidden ${
                  isMobileMenuOpen ? "rotate-180" : ""
                }`}
              />
            </ListItem>
          </div>
        </MenuHandler>
        <MenuList className="hidden max-w-screen-xl rounded-xl lg:block">
          <ul
            className={`grid grid-cols-2 gap-y-2 outline-none outline-0 max-w-4xl ${montserrat.className}`}
          >
            {renderItems}
          </ul>
        </MenuList>
      </Menu>
      <div className="block lg:hidden">
        <Collapse open={isMobileMenuOpen}>{renderItems}</Collapse>
      </div>
    </>
  );
}

function NavList() {
  return (
    <List
      className={`mt-4 mb-6 p-0 lg:mt-0 lg:mb-0 lg:flex-row lg:p-1 ${montserrat.className} text-blue-gray-900`}
    >
      <Link href="/">
        <ListItem className="flex items-center gap-2 py-2 pr-4">Home</ListItem>
      </Link>
      <Link href="/about">
        <ListItem className="flex items-center gap-2 py-2 pr-4">About</ListItem>
      </Link>
      <NavListMenu />
    </List>
  );
}

export function NavbarWithMegaMenu() {
  const [openNav, setOpenNav] = useState(false);

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  return (
    <Navbar
      className={`mx-auto max-w-screen-md px-4 py-2 text-black fixed  top-0 left-1/2 transform -translate-x-1/2 bg-gradient-to-bl from-gray-100 to-gray-300`}
    >
      <div className="flex items-center justify-between">
        <Link href="/" className={`${audiowide.className}`}>
          Travel API Kit
        </Link>

        <div className="hidden lg:block">
          <NavList />
        </div>
        <IconButton
          variant="text"
          color="blue-gray"
          className="lg:hidden"
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <XMarkIcon className="h-6 w-6" strokeWidth={2} />
          ) : (
            <Bars3Icon className="h-6 w-6" strokeWidth={2} />
          )}
        </IconButton>
      </div>
      <Collapse open={openNav}>
        <NavList />
      </Collapse>
    </Navbar>
  );
}
