"use client";
import Link from "next/link";
import MainNav from "./MainNav";
import TopBar from "./TopBar";
import Search from "./Search";

function Header() {
  return (
    <div className="block">
      <TopBar />
      <div className="w-full pb-3 border-b border-gray-200 pt-2">
        <div className="lg:max-w-7xl w-[95%] mx-auto flex justify-between items-center">
          <div className="logo w-[15%] text-2xl font-bold text-gray-800">
            <Link href="/">Logo</Link>
          </div>

          <div className="nav w-[60%]">
            <Search />
          </div>

          <div className="header-actions flex justify-end gap-2 items-center w-[25%]">
            <Link href="/login">
              <span className="bg-slate-800 rounded-full py-2 px-4 border-none text-sm text-white hover:bg-slate-900 transition duration-300 cursor-pointer">
                Signin / Signup
              </span>
            </Link>
          </div>
        </div>
      </div>
      <div className="mainNav lg:max-w-7xl w-[95%] mx-auto flex justify-center items-center pt-2">
        <MainNav />
      </div>
    </div>
  );
}

export default Header;
