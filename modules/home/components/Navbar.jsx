import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { ModeToggle } from "./ModeToggle";
import { Button } from "@base-ui/react";

const Navbar = ({ userRole }) => {
  return (
    <div>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:border-gray-800 border dark:bg-black shadow rounded-xl p-2 mt-4">
          <div className="flex h-16">
            <div className="flex items-center justify-between w-full flex-8">
              <div className="flex-shrink-0">
                <Link
                  href={"/"}
                  className="text-xl font-bold text-gray-800 dark:text-gray-200"
                >
                  <Image
                    className="inline-block mr-1"
                    src="/globe.svg"
                    width={32}
                    height={32}
                    alt="logo"
                  />
                  <span>Leetcode</span>
                </Link>
              </div>
              <div className="hidden md:flex justify-center ">
                <div className="ml-10 flex items-baseline space-x-4">
                  <Link
                    href="/problems"
                    className="text-gray-800 dark:text-gray-200 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Problems
                  </Link>

                  <Link
                    href="/about"
                    className="text-gray-800 dark:text-gray-200 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    About
                  </Link>
                  <Link
                    href="/profile"
                    className=" text-gray-800 dark:text-gray-200 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Profile
                  </Link>
                </div>
              </div>
            </div>
            <div className="hidden md:flex flex-4 justify-end">
              <div className="ml-4 flex items-center md:ml-6">
                <ModeToggle />
                <div className="ml-2 flex">
                  <Show when="signed-out">
                    <SignInButton />
                    <SignUpButton />
                  </Show>
                  {userRole === "admin" && (
                    <Link
                      href="/create-problem"
                      className=" text-gray-800 mr-2 dark:text-gray-200 px-3 py-2 rounded-md border text-sm font-medium block"
                    >
                      Create Problem
                    </Link>
                  )}
                  <Show when="signed-in">
                    <UserButton />
                  </Show>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
