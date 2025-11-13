import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/Fs_w.png";
import { Github, Menu, X } from "lucide-react";
import { Button } from "../ui/button";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // 导航链接统一管理
  const navLinks = [
    { name: "Features", href: "#featuresSection" },
    { name: "Team", href: "#teamSection" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full bg-gray-950/90 backdrop-blur-md shadow-xl border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">

        {/* 左边：Logo */}
        <Link to="/" className="flex items-center space-x-2 shrink-0">
          <img
            src={Logo}
            alt="FairStart Logo"
            className="w-10 h-10  object-cover"
          />
          <h2 className="text-xl font-bold text-blue-400 tracking-wider">
            FairStart
          </h2>
        </Link>

        {/* 中间：桌面导航 */}
        <div className="hidden md:flex items-center space-x-8 font-medium">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-gray-300 hover:text-blue-400 transition-colors"
            >
              {link.name}
            </a>
          ))}

          <Link
            to="/"
            className="flex items-center text-gray-300 hover:text-blue-400 space-x-1 transition-colors"
          >
            <Github size={18} />
            <span>Github</span>
          </Link>
        </div>

        {/* 右边：Auth 按钮 */}
        <div className="hidden md:flex items-center space-x-2">
          <Link to="/login">
            <Button variant="ghost" className="text-gray-300 hover:text-blue-400">
              Log in
            </Button>
          </Link>

          <Link to="/signup">
            <Button className="bg-white  hover:bg-gray-200 text-gray-900 font-semibold">
              Sign up
            </Button>
          </Link>

        </div>

        {/* 移动端菜单按钮 */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-gray-300 hover:text-blue-400 focus:outline-none"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* 移动端下拉菜单 */}
      <div
        className={`md:hidden bg-gray-950 transition-all duration-300 ease-in-out overflow-hidden ${isMenuOpen ? "max-h-96 opacity-100 py-3" : "max-h-0 opacity-0"
          }`}
      >
        <div className="flex flex-col space-y-3 px-4 sm:px-6 pb-4 border-t border-gray-800 pt-3">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              className="text-gray-300 hover:text-blue-400 text-lg py-2 transition-colors"
            >
              {link.name}
            </a>
          ))}

          <Link
            to="/"
            onClick={() => setIsMenuOpen(false)}
            className="flex items-center text-gray-300 hover:text-blue-400 space-x-2 text-lg py-2 transition-colors"
          >
            <Github size={20} />
            <span>Github</span>
          </Link>

          {/* 移动端按钮 */}
          <div className="pt-4 flex flex-col space-y-2">
            <Button
              variant="ghost"
              className="w-full text-gray-300 hover:text-blue-400"
              onClick={() => setIsMenuOpen(false)}
            >
              Log in
            </Button>
            <Button
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold"
              onClick={() => setIsMenuOpen(false)}
            >
              Sign up
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
