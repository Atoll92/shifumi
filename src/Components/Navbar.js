// "use client";
import React, { useState } from "react";
import logo from '../Assets/logo.svg'

function Navbar({ session }) {

  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const MenuItems = ["Play", "The rules", "About"];


  const listItems = MenuItems.map((item, i) => (
    <li key={i} className="px-3 py-2 cursor-pointer rounded hover:text-sky-700" >
      {item}
    </li>
  ));

  return (
    <div className="container relative m-auto p-3 flex justify-between items-center">
      <div>
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="text-4xl font-bold text-sky-800">SHIFUMI</h1>
      </div>
      <nav className={isOpen ? ("flex") : (" hidden md:flex")}>
        <ul className="flex bg-inherit absolute md:relative flex-col md:flex-row w-full shadow md:shadow-none text-center top-12 left-0 md:top-0 md:flex">{listItems}</ul>
      </nav>
      <div className="md:hidden">
        <button className="flex justify-center items-center" onClick={toggleNavbar}>
          <svg
            viewBox="0 0 24 24"
            width="24"
            height="24"
            stroke="currentColor"
            stroke-width="2"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
            className={isOpen ? ("hidden") : ("flex")}
          >
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
          <svg
            viewBox="0 0 24 24"
            width="24"
            height="24"
            stroke="currentColor"
            stroke-width="2"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
            className={isOpen ? ("flex") : ("hidden")}
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
    </div>
  );
}
export default Navbar;