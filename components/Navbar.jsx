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
  FlagIcon,
  SunIcon,
  LanguageIcon,
} from "@heroicons/react/24/outline";
import { audiowide, montserrat } from "@/assets/fonts";

const navListMenuItems = [
  {
    title: "Translator",
    description: "Break language barriers",
    icon: LanguageIcon,
    route: "apis/translator",
  },
  {
    title: "Weather",
    description: "Get real-time weather",
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
    description: "Explore countries",
    icon: FlagIcon,
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
          <div className="flex items-center justify-center rounded-lg p-2 bg-gradient-to-bl from-green-300 via-blue-500 to-purple-600">
            {createElement(icon, {
              strokeWidth: 2,
              className: "h-6 w-6",
              color: "white",
            })}
          </div>
          <div className="text-black">
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
              className="flex items-center gap-2 py-2 pr-4 font-medium text-black"
              selected={isMenuOpen || isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen((cur) => !cur)}
            >
              APIs
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`hidden h-3 w-3 transition-transform lg:block ${
                  isMenuOpen ? "rotate-180" : ""
                }`}
                color="black"
              />
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`block h-3 w-3 transition-transform lg:hidden ${
                  isMobileMenuOpen ? "rotate-180" : ""
                }`}
                color="black"
              />
            </ListItem>
          </div>
        </MenuHandler>
        <MenuList className="hidden max-w-screen-xl rounded-xl lg:block">
          <ul
            className={`grid grid-cols-1 gap-y-2 outline-none outline-0 max-w-4xl ${montserrat.className}`}
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
      className={`mt-4 mb-6 p-0 lg:mt-0 lg:mb-0 lg:flex-row lg:p-1 ${montserrat.className} text-black !min-w-max`}
    >
      <Link href="/">
        <ListItem className="flex items-center gap-2 py-2 pr-4 text-black">
          Home
        </ListItem>
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
      className={`z-10 mx-auto max-w-screen-md px-4 py-2 text-black rounded-t-none  fixed  top-0 left-1/2 transform -translate-x-1/2 bg-gradient-to-bl from-gray-100 to-gray-300`}
    >
      <div className="flex items-center justify-between">
        <Link href="/" className={`${audiowide.className} `}>
          Travel Kit
        </Link>

        <div className="hidden lg:block">
          <NavList />
        </div>
        <IconButton
          variant="text"
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
