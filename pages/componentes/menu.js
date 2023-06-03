import React, { useState } from "react";

import Link from "next/link";

const Navbar_main = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleMenu = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <nav className="flex items-center justify-between flex-wrap bg-white p-2 sticky top-0 z-10">
      <div className="block lg:hidden">
        <button
          className="flex items-center px-3 py-2 border rounded text-color1 border-color1 hover:text-black hover:border-black text-9xl"
          onClick={toggleMenu}
        >
          <svg
            className="fill-current h-3 w-3"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            {isExpanded ? (
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M13.59 6.58997L9.99997 10.17L6.40997 6.58997L5.58997 7.40997L9.99997 11.83L14.42 7.40997L13.59 6.58997Z"
              />
            ) : (
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3 3.75C3 3.33579 3.33579 3 3.75 3H16.25C16.6642 3 17 3.33579 17 3.75C17 4.16421 16.6642 4.5 16.25 4.5H3.75C3.33579 4.5 3 4.16421 3 3.75ZM3 8.25C3 7.83579 3.33579 7.5 3.75 7.5H16.25C16.6642 7.5 17 7.83579 17 8.25C17 8.66421 16.6642 9 16.25 9H3.75C3.33579 9 3 8.66421 3 8.25ZM3.75 12C3.33579 12 3 12.3358 3 12.75C3 13.1642 3.33579 13.5 3.75 13.5H16.25C16.6642 13.5 17 13.1642 17 12.75C17 12.3358 16.6642 12 16.25 12H3.75Z"
              />
            )}
          </svg>
        </button>
      </div>

      <div
        className={`${
          isExpanded ? "block" : "hidden"
        } w-full block flex-grow lg:flex lg:items-center lg:w-auto`}
      >
        <div className="text-sm lg:flex-grow px-3">
          <Link
            href="/category"
            className="block mt-2 lg:inline-block lg:mt-0 text-color1 hover:text-color3 mr-4 text-2xl"
          >
            Categorias
          </Link>

          <Link
            href="/product"
            className="block mt-2 lg:inline-block lg:mt-0 text-color1 hover:text-color3 mr-4 text-2xl"
          >
            Productos
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar_main;
