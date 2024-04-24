"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoNotificationsOutline } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="relative shadow-md p-2 bg-gray-800">
      <div className="container px-6 py-4 mx-auto">
        <div className="lg:flex lg:items-center lg:justify-between">
          <div className="flex items-center justify-between">
            <Image
              width={500}
              height={500}
              class="w-auto h-7 sm:h-8"
              src={"https://merakiui.com/images/logo.svg"}
              alt=""
            />

            {/* Mobile menu button */}
            <div className="flex lg:hidden">
              <button
                type="button"
                className="text-gray-300 hover:text-gray-600 focus:outline-none focus:text-gray-400"
                aria-label="toggle menu"
                onClick={toggleMenu}
              >
                {isOpen ? (
                  <IoMdClose className="h-5 w-5 text-gray-200" />
                ) : (
                  <RxHamburgerMenu className="h-5 w-5 text-gray-200" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu open: "block", Menu closed: "hidden" */}
          <div
            className={`${
              isOpen ? "block" : "hidden"
            } absolute bg-gray-800 inset-x-0 z-20 w-full px-6 py-4 transition-all duration-300 ease-in-out lg:mt-0 lg:p-0 lg:top-0 lg:relative lg:w-auto lg:opacity-100 lg:translate-x-0 lg:flex lg:items-center `}
          >
            <div className="flex flex-col -mx-6 lg:flex-row lg:items-center text-gray-300 lg:mx-8 ">
              <Link
                href={"/"}
                className="px-3 py-2 mx-3 mt-2 font-bold transition-colors duration-300 transform  lg:mt-0 hover:text-gray-500"
              >
                HOME
              </Link>
              <Link
                href={"/post"}
                className="px-3 py-2 mx-3 mt-2 font-bold transition-colors duration-300 transform lg:mt-0 hover:text-gray-500"
              >
                BLOG
              </Link>
              <Link
                href={"/about"}
                className="px-3 py-2 mx-3 mt-2 font-bold transition-colors duration-300 transform lg:mt-0 hover:text-gray-500"
              >
                ABOUT
              </Link>

              <Link href={"/login"} className="px-3 py-2 mx-3 mt-2 font-bold md:font-normal transition-colors border  text-blue-500 border-blue-500 rounded-xl duration-300 transform lg:mt-0  hover:bg-yellow-600 hover:text-gray-200 cursor-pointer">
                Login
              </Link>
              <Link
                href={"/signup"}
                className="px-3 py-2 mx-3 mt-2 font-bold md:font-normal transition-colors border border-blue-500 rounded-xl text-blue-500 duration-300 transform lg:mt-0 hover:bg-yellow-600 hover:text-gray-200"
              >
                SignUp
              </Link>
            </div>

            <div className="flex items-center mt-4 lg:mt-0">
              <button className="relative p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 focus:bg-gray-100 focus:text-gray-600 rounded-full">
                <span className="sr-only">Notifications</span>
                <span className="absolute top-0 right-0 h-2 w-2 mt-1 mr-2 bg-red-500 rounded-full" />
                <span className="absolute top-0 right-0 h-2 w-2 mt-1 mr-2 bg-red-500 rounded-full animate-ping" />
                <IoNotificationsOutline className="h-6 w-6 text-blue-500" />
              </button>
              <button
                type="button"
                className="flex items-center focus:outline-none"
                aria-label="toggle profile dropdown"
              >
                <h3 className="mx-2 text-gray-500 lg:hidden">Khatab wedaa</h3>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
