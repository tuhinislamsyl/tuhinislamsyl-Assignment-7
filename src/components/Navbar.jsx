"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Clock, BarChart2, Menu, X } from "lucide-react";

const navItems = [
  { label: "Home", icon: Home, href: "/" },
  { label: "Timeline", icon: Clock, href: "/timeline" },
  { label: "Stats", icon: BarChart2, href: "/stats" },
];

const Navbar = ()=> {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full border-b border-[#E9E9E9] bg-white">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        
        {/* Logo */}
        <Link href="/" className="text-gray-900 text-lg tracking-tight">
          <span className="font-bold">Keen</span>
          <span className="text-[#244D3F]">Keeper</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex gap-2">
          {navItems.map(({ label, icon: Icon, href }) => (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm transition
              ${
                pathname === href
                  ? "bg-[#1e4d3a] text-white"
                  : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
              }`}>
              <Icon size={15} />
              {label}
            </Link>
          ))}
        </div>

        {/* Mobile & Tablet Toggle */}
        <button
          className="lg:hidden text-gray-500 hover:text-gray-900"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile & Tablet Menu */}
      {open && (
        <div className="lg:hidden border-t px-6 py-3 flex flex-col gap-1 bg-white">
          {navItems.map(({ label, icon: Icon, href }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm transition
              ${
                pathname === href
                  ? "bg-[#1e4d3a] text-white"
                  : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              <Icon size={15} />
              {label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}

export default Navbar;