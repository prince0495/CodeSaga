"use client"
import { useState } from "react";
import Friends from "./NavbarFriends";
import NavUserIcon from "./NavUserIcon";
import Problems from "./ProblemsRouter";
import Rankings from "./Rankings";
import NavbarNotification from "./NavbarNotification";
import AboutUs from "./About";
import { Menu } from "lucide-react";
import NavLogo from "./NavLogo";

// Define component props
type Props = {
  compName: string;
};

const Navbar = ({ compName }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-[#1c1c1c] h-16 border-b border-[#4d4d4d] flex items-center p-3 justify-between relative select-none">
      <div className="flex gap-4 items-center">
        <NavLogo/>
        
        {/* Mobile Menu Icon - Shown below 772px */}
        <div className="md:hidden cursor-pointer text-white " onClick={() => setIsOpen(true)}>
          <Menu size={28}
            color="#ababab"
          />
        </div>
        
        {/* Desktop Navigation - Hidden below 772px */}
        <div className="hidden md:flex gap-7 text-xl ml-5 text-[#cbcbcbd1] items-center cursor-pointer">
          <div className="relative">
            <Problems />
            {compName === "problems" && <div className="bg-white h-1 w-full absolute mt-3.5"></div>}
          </div>
          <div className="relative">
            <Rankings />
            {compName === "rankings" && <div className="bg-white h-1 w-full absolute mt-3.5"></div>}
          </div>
          <div className="relative">
            <Friends />
            {compName === "friends" && <div className="bg-white h-1 w-full absolute mt-3.5"></div>}
          </div>
          <div className="relative">
            <AboutUs />
            {compName === "about-us" && <div className="bg-white h-1 w-full absolute mt-3.5"></div>}
          </div>
        </div>
      </div>

      <div className="flex gap-10">
        <NavbarNotification />
        <NavUserIcon />
        <div className="hidden sm:flex cursor-pointer items-center justify-center p-3 text-[#ffa600d1] rounded-xl bg-[#ffa60013]">
          Premium
        </div>
      </div>
      
      {/* Sidebar */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={() => setIsOpen(false)}>
          <div
            className="w-64 bg-[#1c1c1c] h-full fixed left-0 top-0 p-5 shadow-lg flex flex-col gap-6 transition-transform duration-300"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
          >
            <div className="text-white text-2xl mb-5">Menu</div>
            <Problems />
            <Rankings />
            <Friends />
            <AboutUs />
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;