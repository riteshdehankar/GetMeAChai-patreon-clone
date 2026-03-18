"use client";

import React, { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

const Navbar = () => {
  const { data: session } = useSession();
  const [showdropdown, setShowdropdown] = useState(false);

  return (
    <nav className="bg-gray-900 text-white flex justify-between items-center px-6 h-16">

      <Link href="/" className="font-bold text-xl flex items-center gap-2">
        <img src="/tea.gif" width={40} alt="logo" />
        Get Me A Chai
      </Link>

      <div className="relative flex items-center gap-4">

        {session && (
          <>
            <button
              onClick={() => setShowdropdown(!showdropdown)}
              className="bg-blue-600 px-4 py-2 rounded-lg"
            >
              Account
            </button>

            <div
              className={`absolute top-12 right-0 bg-white text-black rounded shadow-md ${
                showdropdown ? "" : "hidden"
              }`}
            >
              <ul className="p-2">
                <li>
                  <Link href="/dashboard" className="block px-4 py-2 hover:bg-gray-200">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/${session.user.name}`}
                    className="block px-4 py-2 hover:bg-gray-200"
                  >
                    Your Page
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => signOut()}
                    className="block px-4 py-2 hover:bg-gray-200 w-full text-left"
                  >
                    Sign Out
                  </button>
                </li>
              </ul>
            </div>
          </>
        )}

        {!session && (
          <Link href="/login">
            <button className="bg-purple-600 px-4 py-2 rounded-lg">
              Login
            </button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
