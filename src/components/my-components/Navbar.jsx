"use client";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  const lastScrollY = useRef(0);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    router.push("/login");
    closeSidebar();
  };

  const isActive = (href) => {
    if (href === "/") {
      return pathname === "/";
    }
    const regex = new RegExp(`^${href}(/)?$`);
    return regex.test(pathname);
  };

 
const controlNavbar = () => {
  if (typeof window !== "undefined") {
    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY.current) {

      setShowNavbar(false);
      lastScrollY.current = currentScrollY;
    } else {
      
      if (lastScrollY.current - currentScrollY > 10) {
       
        setShowNavbar(true);
        
        lastScrollY.current = currentScrollY;
      }
     
    }
  }
};

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", controlNavbar);
      return () => {
        window.removeEventListener("scroll", controlNavbar);
      };
    }
  }, []);

  return (
    <div
      className={`w-full sticky top-0 z-50 transition-transform duration-300 ${
        showNavbar ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <nav className="bg-gradient-to-br from-[#0c0c1c] via-[#111122] to-[#1a1a2e] bg-opacity-90 backdrop-blur-md shadow-lg rounded-b-xl px-6 py-4 md:py-5">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-cyan-400 font-extrabold text-2xl md:text-3xl select-none cursor-default tracking-wider">
            Notes App
          </div>

          {/* Hamburger untuk mobile */}
          <div className="flex items-center space-x-4 md:hidden">
            <button
              aria-label="Toggle menu"
              onClick={toggleSidebar}
              className="p-2 rounded-md hover:bg-cyan-600/30 focus:outline-none focus:ring-2 focus:ring-cyan-500/60"
            >
              <Menu className="text-cyan-400" size={24} />
            </button>
          </div>

          {/* Menu desktop */}
          <div className="hidden md:flex space-x-6 items-center">
            {[{ href: "/", label: "Home" }, { href: "/about", label: "About Us" }, { href: "/notes", label: "List Notes" }].map(
              ({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className={`relative px-3 py-2 rounded-md font-medium text-cyan-300 hover:bg-cyan-600/30 transition-colors ${
                    isActive(href) ? "bg-cyan-600/50 text-cyan-100" : ""
                  }`}
                >
                  {label}
                </Link>
              )
            )}

            {isLoggedIn && (
              <Link
                href="/notes/create"
                className={`relative px-3 py-2 rounded-md font-medium text-cyan-300 hover:bg-cyan-600/30 transition-colors ${
                  isActive("/notes/create") ? "bg-cyan-600/50 text-cyan-100" : ""
                }`}
              >
                Create Notes
              </Link>
            )}

            {isLoggedIn ? (
              <Button
                size="sm"
                onClick={handleLogout}
                className="text-white bg-red-600 hover:bg-red-700 transition"
              >
                Logout
              </Button>
            ) : (
              <div className="flex space-x-3">
                <Link href="/login">
                  <Button size="sm" className="text-white bg-cyan-600 hover:bg-cyan-700 transition">
                    Login
                  </Button>
                </Link>
                <Link href="/register">
                  <Button size="sm" className="text-cyan-900 bg-cyan-100 hover:bg-cyan-200 transition">
                    Register
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Overlay & Drawer untuk mobile */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ease-in-out ${
          isOpen ? "visible bg-black/60 opacity-100" : "invisible opacity-0"
        }`}
        onClick={closeSidebar}
      >
        <div
          className={`w-64 bg-gradient-to-br from-[#0c0c1c] via-[#111122] to-[#1a1a2e] p-6 space-y-6 transform transition-transform duration-300 ease-in-out h-full shadow-lg rounded-r-xl ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between">
            <div className="text-cyan-400 font-extrabold text-2xl select-none cursor-default tracking-wider">
              Notes App
            </div>
            <button
              aria-label="Close menu"
              onClick={closeSidebar}
              className="p-1 rounded-md hover:bg-cyan-600/30 focus:outline-none focus:ring-2 focus:ring-cyan-500/60"
            >
              <X className="text-cyan-400" size={24} />
            </button>
          </div>

          <nav className="flex flex-col space-y-3 mt-6">
            {[{ href: "/", label: "Home" }, { href: "/about", label: "About Us" }, { href: "/notes", label: "List Notes" }].map(
              ({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={closeSidebar}
                  className={`relative px-4 py-2 rounded-md font-medium text-cyan-300 hover:bg-cyan-600/30 transition-colors ${
                    isActive(href) ? "bg-cyan-600/50 text-cyan-100" : ""
                  }`}
                >
                  {label}
                </Link>
              )
            )}

            {isLoggedIn && (
              <Link
                href="/notes/create"
                onClick={closeSidebar}
                className={`relative px-4 py-2 rounded-md font-medium text-cyan-300 hover:bg-cyan-600/30 transition-colors ${
                  isActive("/notes/create") ? "bg-cyan-600/50 text-cyan-100" : ""
                }`}
              >
                Create Notes
              </Link>
            )}

            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="text-cyan-100 text-left font-medium px-4 py-2 rounded-md hover:bg-red-600 transition"
              >
                Logout
              </button>
            ) : (
              <div className="flex space-x-4">
                <Link
                  href="/login"
                  onClick={closeSidebar}
                  className="text-cyan-300 font-medium px-4 py-2 rounded-md hover:bg-cyan-600/30 transition"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  onClick={closeSidebar}
                  className="text-cyan-300 font-medium px-4 py-2 rounded-md hover:bg-cyan-600/30 transition"
                >
                  Register
                </Link>
              </div>
            )}
          </nav>
        </div>
      </div>
    </div>
  );
}
