import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { HiOutlineMenu } from 'react-icons/hi';
import { RiCloseLine } from 'react-icons/ri';

import { logo } from '../assets';
import { links } from '../assets/constants';

const NavLinks = ({ handLeCLick }) => (
  <div className="mt-10">
    {links.map((link) => (
      <NavLink
        key={link.name}
        to={link.to}
        className="flex flex-row justify-start items-center my-8
        text-sm font-medium text-gray-400 hover:text-cyan-400"
        onClick={() => handLeCLick && handLeCLick()}
      >
        <link.icon className="w-6 h-6 aspect-square mr-2" />
        {link.name}
      </NavLink>
    ))}
  </div>
);

const Sidebar = () => {
  const [toggleMobileMenu, setToggleMobileMenu] = useState(false);

  return (
    <>
      <aside className="hidden md:flex flex-col w-[240px] py-10 px-4
      bg-[#290600]"
      >
        <a href="/">
          <img
            src={logo}
            alt="logo"
            className="block w-full
              h-[10rem] object-contain"
          />
        </a>
        <NavLinks />
      </aside>

      {/* Mobile Menu */}
      <div className="absolute md:hidden block top-6 right-6 z-[99999]">
        {toggleMobileMenu ? (
          <RiCloseLine
            className="w-6 h-6
         text-white mr-2 cursor-pointer"
            onClick={() => setToggleMobileMenu(false)}
          />
        ) : (
          <HiOutlineMenu
            className="w-6 h-6
         text-white mr-2 cursor-pointer"
            onClick={() => setToggleMobileMenu(true)}
          />
        )}
      </div>

      {/* Overlay */}
      {toggleMobileMenu ? <div onClick={() => { setToggleMobileMenu(!toggleMobileMenu); }} className="bg-redBlood/30 z-10 smooth-transition fixed w-full h-screen  top-0 left-0" /> : ''}

      {/* Side drawer menu */}
      <aside className={`flex flex-col gap-4 absolute md:hidden top-0 h-screen w-2/3
       bg--gradient-to-tl from-white/10 to-biltong/70
       backdrop-blur-lg z-20 smooth-transition p-6
        ${toggleMobileMenu ? 'left-0' : '-left-full'}`}
      >
        <a href="/">
          <img
            src={logo}
            alt="logo"
            className="block w-full
              h-[120px] object-contain"
          />
        </a>
        <NavLinks handLeCLick={() => setToggleMobileMenu(true)} />
      </aside>
    </>
  );
};

export default Sidebar;
