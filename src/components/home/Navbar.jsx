import React, { useState } from "react";
// 引入用户提供的依赖项
import { Link } from "react-router-dom";
import Logo from '../../assets/Fs.png';

import { Github, Menu, X } from "lucide-react";
import { Button } from "../ui/button"; // 假设 Button 是一个基础的样式化按钮组件

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    // 1. 核心容器优化: 固定在顶部，高 z-index, 深色背景 + 模糊透明效果
    <nav className="sticky top-0 z-50 w-full bg-gray-950/90 backdrop-blur-md shadow-xl border-b border-gray-800">

      {/* 2. 内容居中容器 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">

        {/* 左边：Logo/品牌 */}
        <Link to="/" className="flex items-center space-x-2 shrink-0">
          <img className="w-10 h-10 rounded-full object-cover" src={Logo} alt="AI Resume Logo" />
          <span className="text-xl font-bold text-blue-400 tracking-wider">FairStart</span>
        </Link>

        {/* 中间：桌面端导航链接 */}
        <div className="hidden md:flex items-center space-x-8 font-medium">
          {/* 统一使用 text-gray-300 和 hover:text-blue-400 */}
          <Link to="/" className="text-gray-300 hover:text-blue-400 transition-colors">Features</Link>
          <Link to="/" className="text-gray-300 hover:text-blue-400 transition-colors">Team</Link>
          <Link to="/" className="flex items-center text-gray-300 hover:text-blue-400 space-x-1 transition-colors">
            <Github size={18} />
            <span>Github</span>
          </Link>
        </div>

        {/* 右边：Dashboard Button (桌面端) */}
        <div className="hidden md:block">
          <Link to="/">
            {/* 3. 按钮样式优化: 浅色背景（bg-white）和深色文本（text-gray-900） */}
            <Button className="h-10 px-6 bg-white text-gray-900 font-semibold rounded-lg shadow-md transition-colors duration-200 hover:bg-gray-300 border border-transparent">
              Dashboard
            </Button>
          </Link>
        </div>

        {/* 移动端：菜单按钮 */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white hover:text-blue-400 focus:outline-none"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* 4. 移动端：下拉菜单 (Menu Dropdown) */}
      <div
        className={`md:hidden bg-gray-950 transition-all duration-300 ease-in-out overflow-hidden ${isMenuOpen ? 'max-h-96 opacity-100 py-3' : 'max-h-0 opacity-0'}`}
      >
        <div className="flex flex-col space-y-3 px-4 sm:px-6 pb-4 border-t border-gray-800 pt-3">

          <Link
            to="/"
            className="text-gray-300 hover:text-blue-400 text-lg py-2 transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Features
          </Link>

          <Link
            to="/"
            className="text-gray-300 hover:text-blue-400 text-lg py-2 transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Team
          </Link>

          <Link
            to="/"
            className="flex items-center text-gray-300 hover:text-blue-400 space-x-2 text-lg py-2 transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            <Github size={20} />
            <span>Github</span>
          </Link>

          <div className="pt-4">
            <Link to="/" onClick={() => setIsMenuOpen(false)}>
              {/* 移动端按钮也使用浅色样式 */}
              <Button className="w-full h-10 bg-white text-gray-900 font-semibold rounded-lg shadow-md transition-colors duration-200 hover:bg-gray-100">
                Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;